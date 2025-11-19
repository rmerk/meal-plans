/**
 * Meal Plan Utilities
 * Shared functions for all meal plan pages
 * Provides shopping list management, export functionality, and checkbox persistence
 */

// localStorage key for checkbox state
const CHECKBOX_STORAGE_KEY = 'meal_plans_shopping_checkboxes'

/**
 * Get the current page identifier from the URL
 * @returns {string} The page filename without extension
 */
function getPageId() {
  return window.location.pathname.split('/').pop().replace('.html', '')
}

/**
 * Load checkbox states from localStorage for the current page
 * @returns {Object} Object mapping item text to checked state, empty object if none saved
 */
function loadCheckboxStates() {
  try {
    const saved = localStorage.getItem(CHECKBOX_STORAGE_KEY)
    const allStates = saved ? JSON.parse(saved) : {}
    return allStates[getPageId()] || {}
  } catch (error) {
    console.error('Failed to load checkbox states:', error)
    return {}
  }
}

/**
 * Save a single checkbox state to localStorage
 * @param {string} itemText - The text content of the shopping list item
 * @param {boolean} isChecked - Whether the checkbox is checked
 * @returns {boolean} True if save was successful, false otherwise
 */
function saveCheckboxState(itemText, isChecked) {
  try {
    const saved = localStorage.getItem(CHECKBOX_STORAGE_KEY)
    const allStates = saved ? JSON.parse(saved) : {}
    const pageId = getPageId()

    if (!allStates[pageId]) {
      allStates[pageId] = {}
    }

    allStates[pageId][itemText] = isChecked
    localStorage.setItem(CHECKBOX_STORAGE_KEY, JSON.stringify(allStates))
    return true
  } catch (error) {
    console.error('Failed to save checkbox state:', error)
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear some browser data.')
    }
    return false
  }
}

/**
 * Copy shopping list to clipboard in formatted text
 * Includes check marks for checked items
 */
function copyShoppingList() {
  const section = document.getElementById('shopping-list')
  if (!section) return

  let text = 'SHOPPING LIST\n\n'

  // Get all checkboxes and their labels
  const items = section.querySelectorAll('li')
  items.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]')
    if (checkbox) {
      // Remove checkbox from text content
      const label = item.textContent.trim()
      const checkmark = checkbox.checked ? '☑' : '☐'
      text += `${checkmark} ${label}\n`
    }
  })

  // Copy to clipboard
  navigator.clipboard.writeText(text).then(() => {
    showCopyNotification('Shopping list copied to clipboard!')
  }).catch((err) => {
    console.error('Failed to copy:', err)
    alert('Failed to copy to clipboard')
  })
}

/**
 * Show a temporary notification message
 * @param {string} message - The message to display
 */
function showCopyNotification(message = 'Shopping list copied to clipboard!') {
  const notification = document.createElement('div')
  notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in'
  notification.innerHTML = `
        <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="font-semibold">${message}</span>
        </div>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = '0'
    notification.style.transition = 'opacity 0.3s'
    setTimeout(() => notification.remove(), 300)
  }, 2000)
}

/**
 * Trigger browser print dialog for the shopping list
 */
function printShoppingList() {
  window.print()
}

/**
 * Export shopping list to CSV file with categories and checked status
 * Downloads file as shopping-list-{page-id}.csv
 */
function exportShoppingCSV() {
  const section = document.getElementById('shopping-list')
  if (!section) return

  let csv = 'Category,Item,Checked\n'

  // Get all categories and items
  const categories = section.querySelectorAll('h4')
  categories.forEach((categoryHeader) => {
    const categoryName = categoryHeader.textContent.trim()
    const ul = categoryHeader.nextElementSibling
    if (ul && ul.tagName === 'UL') {
      const items = ul.querySelectorAll('li')
      items.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]')
        if (checkbox) {
          const itemText = item.textContent.trim()
          const checked = checkbox.checked ? 'Yes' : 'No'
          csv += `"${categoryName}","${itemText}",${checked}\n`
        }
      })
    }
  })

  // Download file
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `shopping-list-${getPageId()}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  showCopyNotification('Shopping list exported to CSV!')
}

/**
 * Clear all checked checkboxes in the shopping list after confirmation
 * Updates localStorage to reflect the cleared state
 */
function clearAllCheckboxes() {
  if (confirm('Clear all checked items?')) {
    const checkboxes = document.querySelectorAll('#shopping-list input[type="checkbox"]')
    checkboxes.forEach((cb) => {
      cb.checked = false
      saveCheckboxState(cb.parentElement.textContent.trim(), false)
    })
    showCopyNotification('All items cleared!')
  }
}

// Add copy and print buttons to shopping list section on page load
document.addEventListener('DOMContentLoaded', function () {
  const shoppingSection = document.getElementById('shopping-list')
  if (!shoppingSection) return

  const header = shoppingSection.querySelector('h2')
  if (!header) return

  // Load saved checkbox states
  const savedStates = loadCheckboxStates()
  const checkboxes = shoppingSection.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    const itemText = checkbox.parentElement.textContent.trim()
    if (savedStates[itemText] !== undefined) {
      checkbox.checked = savedStates[itemText]
    }

    // Add change listener to save state
    checkbox.addEventListener('change', function () {
      saveCheckboxState(itemText, this.checked)
    })
  })

  // Create button container
  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'flex gap-2 print:hidden'
  buttonContainer.innerHTML = `
        <button onclick="copyShoppingList()" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy
        </button>
        <button onclick="exportShoppingCSV()" class="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            CSV
        </button>
        <button onclick="printShoppingList()" class="bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print
        </button>
        <button onclick="clearAllCheckboxes()" class="bg-slate-500 hover:bg-slate-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Clear
        </button>
    `

  // Wrap header and buttons in a flex container
  const headerContainer = document.createElement('div')
  headerContainer.className = 'flex items-center justify-between mb-4 border-b border-slate-100 pb-2 flex-wrap gap-2'

  // Move header into container
  header.classList.remove('mb-4', 'border-b', 'border-slate-100', 'pb-2')
  header.parentNode.insertBefore(headerContainer, header)
  headerContainer.appendChild(header)
  headerContainer.appendChild(buttonContainer)
})
