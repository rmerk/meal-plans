/**
 * Cooking Mode Manager
 * Centralized utilities for managing cooking mode progress across meal plans
 */

/**
 * Generate a standardized storage key for a meal plan
 * @param {string} planId - The meal plan identifier (e.g., 'week1-meals')
 * @returns {string} The storage key
 */
function getCookingProgressKey(planId) {
  return `cooking_progress_${planId.replace('.html', '')}`
}

/**
 * Save cooking progress to localStorage
 * @param {string} planId - The meal plan identifier
 * @param {Object} progressData - The progress data to save
 * @param {number} progressData.currentStep - Current step index
 * @param {boolean[]} progressData.stepCompletions - Array of step completion states
 * @param {number} progressData.elapsedSeconds - Total elapsed time in seconds
 */
function saveCookingProgress(planId, progressData) {
  try {
    const key = getCookingProgressKey(planId)
    const data = {
      currentStep: progressData.currentStep || 0,
      stepCompletions: progressData.stepCompletions || [],
      elapsedSeconds: progressData.elapsedSeconds || 0,
      lastUpdated: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Failed to save cooking progress:', error)
    // Handle quota exceeded or other localStorage errors
    if (error.name === 'QuotaExceededError') {
      alert('Storage quota exceeded. Please clear some browser data.')
    }
    return false
  }
}

/**
 * Load cooking progress from localStorage
 * @param {string} planId - The meal plan identifier
 * @param {number} totalSteps - Total number of cooking steps
 * @returns {Object} The progress data or default values
 */
function loadCookingProgress(planId, totalSteps) {
  try {
    const key = getCookingProgressKey(planId)
    const saved = localStorage.getItem(key)

    if (saved) {
      const data = JSON.parse(saved)
      return {
        currentStep: data.currentStep || 0,
        stepCompletions: data.stepCompletions || Array(totalSteps).fill(false),
        elapsedSeconds: data.elapsedSeconds || 0,
        lastUpdated: data.lastUpdated || null
      }
    }
  } catch (error) {
    console.error('Failed to load cooking progress:', error)
  }

  // Return default values
  return {
    currentStep: 0,
    stepCompletions: Array(totalSteps).fill(false),
    elapsedSeconds: 0,
    lastUpdated: null
  }
}

/**
 * Clear cooking progress for a specific meal plan
 * @param {string} planId - The meal plan identifier
 * @returns {boolean} Success status
 */
function clearCookingProgress(planId) {
  try {
    const key = getCookingProgressKey(planId)
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Failed to clear cooking progress:', error)
    return false
  }
}

/**
 * Get all cooking progress data (useful for debugging or data export)
 * @returns {Object} All cooking progress data keyed by plan ID
 */
function getAllCookingProgress() {
  const allProgress = {}
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('cooking_progress_')) {
        const planId = key.replace('cooking_progress_', '')
        const data = localStorage.getItem(key)
        if (data) {
          allProgress[planId] = JSON.parse(data)
        }
      }
    }
  } catch (error) {
    console.error('Failed to get all cooking progress:', error)
  }
  return allProgress
}

/**
 * Clear all cooking progress data
 * @returns {boolean} Success status
 */
function clearAllCookingProgress() {
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('cooking_progress_')) {
        keys.push(key)
      }
    }
    keys.forEach(key => localStorage.removeItem(key))
    return true
  } catch (error) {
    console.error('Failed to clear all cooking progress:', error)
    return false
  }
}

/**
 * Calculate cooking progress percentage
 * @param {boolean[]} stepCompletions - Array of step completion states
 * @returns {number} Progress percentage (0-100)
 */
function calculateProgressPercentage(stepCompletions) {
  if (!stepCompletions || stepCompletions.length === 0) return 0
  const completed = stepCompletions.filter(Boolean).length
  return Math.round((completed / stepCompletions.length) * 100)
}

/**
 * Format elapsed time for display
 * @param {number} elapsedSeconds - Total elapsed seconds
 * @returns {string} Formatted time string (HH:MM:SS or MM:SS)
 */
function formatElapsedTime(elapsedSeconds) {
  const hours = Math.floor(elapsedSeconds / 3600)
  const minutes = Math.floor((elapsedSeconds % 3600) / 60)
  const seconds = elapsedSeconds % 60

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Export functions for use in meal plan pages
if (typeof window !== 'undefined') {
  window.CookingModeManager = {
    saveCookingProgress,
    loadCookingProgress,
    clearCookingProgress,
    getAllCookingProgress,
    clearAllCookingProgress,
    calculateProgressPercentage,
    formatElapsedTime,
    getCookingProgressKey
  }
}
