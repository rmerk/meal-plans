// Meal Plan Utilities
// Shared functions for all meal plan pages

// Copy shopping list to clipboard
function copyShoppingList() {
    const section = document.getElementById('shopping-list');
    if (!section) return;

    let text = "SHOPPING LIST\n\n";

    // Get all checkboxes and their labels
    const items = section.querySelectorAll('li');
    items.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox) {
            // Remove checkbox from text content
            const label = item.textContent.trim();
            text += `☐ ${label}\n`;
        }
    });

    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification();
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
    });
}

// Show copy confirmation notification
function showCopyNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="font-semibold">Shopping list copied to clipboard!</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Print shopping list
function printShoppingList() {
    window.print();
}

// Add copy and print buttons to shopping list section on page load
document.addEventListener('DOMContentLoaded', function() {
    const shoppingSection = document.getElementById('shopping-list');
    if (!shoppingSection) return;

    const header = shoppingSection.querySelector('h2');
    if (!header) return;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex gap-2 print:hidden';
    buttonContainer.innerHTML = `
        <button onclick="copyShoppingList()" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy List
        </button>
        <button onclick="printShoppingList()" class="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print List
        </button>
    `;

    // Wrap header and buttons in a flex container
    const headerContainer = document.createElement('div');
    headerContainer.className = 'flex items-center justify-between mb-4 border-b border-slate-100 pb-2';

    // Move header into container
    header.classList.remove('mb-4', 'border-b', 'border-slate-100', 'pb-2');
    header.parentNode.insertBefore(headerContainer, header);
    headerContainer.appendChild(header);
    headerContainer.appendChild(buttonContainer);
});
