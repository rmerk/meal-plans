/**
 * Mobile Utils - Progressive Web App and Mobile Experience Enhancements
 * Provides: PWA installation, service worker, swipe gestures, haptic feedback
 */

// ============================================================================
// PWA SERVICE WORKER REGISTRATION
// ============================================================================

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './'
      })

      console.log('[PWA] Service Worker registered:', registration.scope)

      // Check for updates periodically
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        console.log('[PWA] New Service Worker found, installing...')

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available, show update prompt
            showUpdateNotification()
          }
        })
      })

      return registration
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error)
    }
  }
}

function showUpdateNotification() {
  // Simple banner notification (can be enhanced with custom UI)
  const banner = document.createElement('div')
  banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg z-[200] flex items-center gap-3'
  banner.innerHTML = `
    <span>New version available!</span>
    <button onclick="location.reload()" class="bg-white/20 px-4 py-1 rounded-full hover:bg-white/30 transition">
      Update
    </button>
  `
  document.body.appendChild(banner)

  setTimeout(() => banner.remove(), 10000)
}

// ============================================================================
// PWA INSTALL PROMPT
// ============================================================================

let deferredPrompt

function initPWAInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    deferredPrompt = e

    // Show custom install button/banner
    showInstallPromotion()
  })

  // Track when app is installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully')
    deferredPrompt = null
    hideInstallPromotion()

    // Send analytics event (if implemented)
    if (typeof logEvent === 'function') {
      logEvent('pwa_installed')
    }
  })
}

function showInstallPromotion() {
  // Check if user has dismissed the prompt before
  if (localStorage.getItem('pwa-install-dismissed') === 'true') {
    return
  }

  const installBanner = document.createElement('div')
  installBanner.id = 'pwa-install-banner'
  installBanner.className = 'fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-br from-orange-500 to-rose-500 text-white rounded-2xl shadow-2xl p-4 z-[150] animate-slide-up'
  installBanner.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <h3 class="font-bold text-lg mb-1">Install Meal Plans</h3>
        <p class="text-sm text-white/90">Add to home screen for quick access and offline use!</p>
      </div>
      <button onclick="dismissInstallPromotion()" class="text-white/80 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="flex gap-2 mt-3">
      <button onclick="installPWA()" class="flex-1 bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-orange-50 transition">
        Install
      </button>
      <button onclick="dismissInstallPromotion()" class="px-4 py-2 text-white/90 hover:text-white transition">
        Later
      </button>
    </div>
  `

  document.body.appendChild(installBanner)
}

function hideInstallPromotion() {
  const banner = document.getElementById('pwa-install-banner')
  if (banner) {
    banner.remove()
  }
}

window.installPWA = async function () {
  if (!deferredPrompt) {
    return
  }

  // Show the install prompt
  deferredPrompt.prompt()

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  console.log('[PWA] User choice:', outcome)

  deferredPrompt = null
  hideInstallPromotion()
}

window.dismissInstallPromotion = function () {
  localStorage.setItem('pwa-install-dismissed', 'true')
  hideInstallPromotion()
}

// ============================================================================
// HAPTIC FEEDBACK (VIBRATION API)
// ============================================================================

const HapticPatterns = {
  light: 10,
  medium: 20,
  heavy: 50,
  success: [50, 100, 50],
  error: [100, 50, 100],
  warning: [30, 50, 30],
  selection: 15
}

function haptic(pattern = 'light') {
  // Check if user has disabled haptics
  if (localStorage.getItem('haptics-disabled') === 'true') {
    return
  }

  if ('vibrate' in navigator) {
    const vibrationPattern = HapticPatterns[pattern] || pattern
    navigator.vibrate(vibrationPattern)
  }
}

// Convenience functions
window.hapticLight = () => haptic('light')
window.hapticMedium = () => haptic('medium')
window.hapticHeavy = () => haptic('heavy')
window.hapticSuccess = () => haptic('success')
window.hapticError = () => haptic('error')
window.hapticSelection = () => haptic('selection')

// ============================================================================
// SWIPE GESTURE DETECTION
// ============================================================================

class SwipeDetector {
  constructor(element, options = {}) {
    this.element = element
    this.options = {
      threshold: 50, // Minimum distance for swipe
      restraint: 100, // Maximum perpendicular distance
      allowedTime: 500, // Maximum time for swipe
      onSwipeLeft: null,
      onSwipeRight: null,
      onSwipeUp: null,
      onSwipeDown: null,
      ...options
    }

    this.touchStartX = 0
    this.touchStartY = 0
    this.touchEndX = 0
    this.touchEndY = 0
    this.startTime = 0

    this.init()
  }

  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true })
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true })
  }

  handleTouchStart(e) {
    const touch = e.changedTouches[0]
    this.touchStartX = touch.pageX
    this.touchStartY = touch.pageY
    this.startTime = Date.now()
  }

  handleTouchMove(e) {
    // Prevent default to stop scrolling while swiping (if configured)
    if (this.options.preventScroll) {
      e.preventDefault()
    }
  }

  handleTouchEnd(e) {
    const touch = e.changedTouches[0]
    this.touchEndX = touch.pageX
    this.touchEndY = touch.pageY

    this.handleSwipe()
  }

  handleSwipe() {
    const elapsedTime = Date.now() - this.startTime

    // Check if swipe was fast enough
    if (elapsedTime > this.options.allowedTime) {
      return
    }

    const distanceX = this.touchEndX - this.touchStartX
    const distanceY = this.touchEndY - this.touchStartY

    // Determine if horizontal swipe
    if (Math.abs(distanceX) >= this.options.threshold && Math.abs(distanceY) <= this.options.restraint) {
      if (distanceX > 0 && this.options.onSwipeRight) {
        haptic('selection')
        this.options.onSwipeRight()
      } else if (distanceX < 0 && this.options.onSwipeLeft) {
        haptic('selection')
        this.options.onSwipeLeft()
      }
    }
    // Determine if vertical swipe
    else if (Math.abs(distanceY) >= this.options.threshold && Math.abs(distanceX) <= this.options.restraint) {
      if (distanceY > 0 && this.options.onSwipeDown) {
        haptic('selection')
        this.options.onSwipeDown()
      } else if (distanceY < 0 && this.options.onSwipeUp) {
        haptic('selection')
        this.options.onSwipeUp()
      }
    }
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart)
    this.element.removeEventListener('touchmove', this.handleTouchMove)
    this.element.removeEventListener('touchend', this.handleTouchEnd)
  }
}

window.SwipeDetector = SwipeDetector

// ============================================================================
// PULL TO REFRESH
// ============================================================================

function initPullToRefresh(callback) {
  let touchStartY = 0
  let touchEndY = 0
  let isPulling = false

  document.addEventListener('touchstart', (e) => {
    // Only trigger if at top of page
    if (window.scrollY === 0) {
      touchStartY = e.touches[0].clientY
      isPulling = true
    }
  }, { passive: true })

  document.addEventListener('touchmove', (e) => {
    if (!isPulling) return

    touchEndY = e.touches[0].clientY
    const pullDistance = touchEndY - touchStartY

    // Show visual indicator when pulled down enough
    if (pullDistance > 80) {
      // Add visual feedback (can be enhanced with custom UI)
      document.body.style.transform = `translateY(${Math.min(pullDistance - 80, 40)}px)`
      document.body.style.transition = 'none'
    }
  }, { passive: true })

  document.addEventListener('touchend', () => {
    if (!isPulling) return

    const pullDistance = touchEndY - touchStartY

    // Reset visual state
    document.body.style.transform = ''
    document.body.style.transition = 'transform 0.3s ease'

    // Trigger refresh if pulled far enough
    if (pullDistance > 120) {
      haptic('medium')
      if (callback) callback()
    }

    isPulling = false
    touchStartY = 0
    touchEndY = 0
  }, { passive: true })
}

// ============================================================================
// NATIVE SHARE API
// ============================================================================

async function nativeShare(data) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title || document.title,
        text: data.text || '',
        url: data.url || window.location.href
      })
      haptic('success')
      return true
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('[Share] Failed:', error)
      }
      return false
    }
  } else {
    // Fallback to copy to clipboard
    return copyToClipboard(data.text || data.url || window.location.href)
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    haptic('success')
    showToast('Copied to clipboard!')
    return true
  } catch (error) {
    console.error('[Clipboard] Failed:', error)
    return false
  }
}

function showToast(message, duration = 3000) {
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-[200] animate-fade-in'
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('animate-fade-out')
    setTimeout(() => toast.remove(), 300)
  }, duration)
}

window.nativeShare = nativeShare
window.showToast = showToast

// ============================================================================
// LANDSCAPE MODE DETECTION & HANDLING
// ============================================================================

let currentOrientation = 'portrait'

function detectOrientation() {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  const newOrientation = isLandscape ? 'landscape' : 'portrait'

  if (newOrientation !== currentOrientation) {
    currentOrientation = newOrientation
    document.body.classList.remove('orientation-portrait', 'orientation-landscape')
    document.body.classList.add(`orientation-${newOrientation}`)

    // Dispatch custom event for pages to react
    window.dispatchEvent(new CustomEvent('orientationchange', {
      detail: { orientation: newOrientation }
    }))

    console.log('[MobileUtils] Orientation changed to:', newOrientation)
  }
}

function initOrientationDetection() {
  detectOrientation()
  window.addEventListener('resize', detectOrientation)
  window.addEventListener('orientationchange', detectOrientation)
}

// ============================================================================
// DARK MODE
// ============================================================================

function initDarkMode() {
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  let theme = savedTheme || (systemPrefersDark ? 'dark' : 'light')

  // Apply theme
  setTheme(theme)

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light')
    }
  })
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)

  // Dispatch event for custom reactions
  window.dispatchEvent(new CustomEvent('themechange', {
    detail: { theme }
  }))
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  setTheme(newTheme)
  haptic('medium')
  return newTheme
}

window.toggleDarkMode = toggleDarkMode

// ============================================================================
// VOICE SEARCH (WEB SPEECH API)
// ============================================================================

function startVoiceSearch(callback) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Voice search not supported in this browser')
    return
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onstart = () => {
    showToast('🎤 Listening...', 5000)
    haptic('medium')
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    haptic('success')
    if (callback) callback(transcript)
  }

  recognition.onerror = (event) => {
    console.error('[VoiceSearch] Error:', event.error)
    haptic('error')
    showToast('Voice search failed. Please try again.')
  }

  recognition.onend = () => {
    console.log('[VoiceSearch] Ended')
  }

  try {
    recognition.start()
  } catch (error) {
    console.error('[VoiceSearch] Start failed:', error)
    showToast('Could not start voice search')
  }

  return recognition
}

window.startVoiceSearch = startVoiceSearch

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('[Notifications] Not supported')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

async function showNotification(title, options = {}) {
  const hasPermission = await requestNotificationPermission()

  if (!hasPermission) {
    console.log('[Notifications] Permission denied')
    return
  }

  const defaultOptions = {
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    ...options
  }

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // Use service worker for better control
    const registration = await navigator.serviceWorker.ready
    return registration.showNotification(title, defaultOptions)
  } else {
    // Fallback to regular notification
    return new Notification(title, defaultOptions)
  }
}

function scheduleMealPrepReminder(dayOfWeek = 0, hour = 9, minute = 0) {
  // Save reminder preference
  const reminder = { dayOfWeek, hour, minute, enabled: true }
  localStorage.setItem('meal_prep_reminder', JSON.stringify(reminder))

  showToast('Meal prep reminder set!')
  haptic('success')

  // Note: Actual scheduling requires service worker with periodic background sync
  // For now, we'll check on page load and show reminders
}

function checkMealPrepReminder() {
  const reminderData = localStorage.getItem('meal_prep_reminder')
  if (!reminderData) return

  const reminder = JSON.parse(reminderData)
  if (!reminder.enabled) return

  const now = new Date()
  const lastShown = localStorage.getItem('last_reminder_shown')
  const lastShownDate = lastShown ? new Date(lastShown) : null

  // Only show once per day
  if (lastShownDate && now.toDateString() === lastShownDate.toDateString()) {
    return
  }

  // Check if it's the right day and time
  if (now.getDay() === reminder.dayOfWeek && now.getHours() >= reminder.hour) {
    showNotification('Time to Meal Prep! 🍳', {
      body: 'Your weekly meal prep reminder. Start cooking to stay on track!',
      tag: 'meal-prep-reminder',
      actions: [
        { action: 'start-cooking', title: 'Start Cooking' },
        { action: 'dismiss', title: 'Later' }
      ]
    })

    localStorage.setItem('last_reminder_shown', now.toISOString())
  }
}

window.scheduleMealPrepReminder = scheduleMealPrepReminder
window.showNotification = showNotification

// ============================================================================
// CAMERA & PHOTO CAPTURE
// ============================================================================

// IndexedDB setup for photo storage
let photoDb = null

async function initPhotoDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MealPhotosDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      photoDb = request.result
      resolve(photoDb)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      if (!db.objectStoreNames.contains('photos')) {
        const objectStore = db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true })
        objectStore.createIndex('mealPlan', 'mealPlan', { unique: false })
        objectStore.createIndex('timestamp', 'timestamp', { unique: false })
        objectStore.createIndex('rating', 'rating', { unique: false })
      }
    }
  })
}

// Initialize camera access
async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // Use back camera on mobile
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    })

    console.log('[Camera] Access granted')
    return stream
  } catch (error) {
    console.error('[Camera] Access denied:', error)

    if (error.name === 'NotAllowedError') {
      showToast('Camera access denied. Please enable in settings.')
    } else if (error.name === 'NotFoundError') {
      showToast('No camera found on this device.')
    } else {
      showToast('Could not access camera.')
    }

    throw error
  }
}

// Capture photo from video stream
async function capturePhoto(videoElement) {
  const canvas = document.createElement('canvas')
  canvas.width = videoElement.videoWidth
  canvas.height = videoElement.videoHeight

  const ctx = canvas.getContext('2d')
  ctx.drawImage(videoElement, 0, 0)

  // Convert to blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve({
        blob,
        dataUrl: canvas.toDataURL('image/jpeg', 0.85)
      })
    }, 'image/jpeg', 0.85)
  })
}

// Save photo to IndexedDB
async function saveMealPhoto(photoData, mealPlan, notes = '', rating = null) {
  if (!photoDb) {
    await initPhotoDatabase()
  }

  const transaction = photoDb.transaction(['photos'], 'readwrite')
  const objectStore = transaction.objectStore('photos')

  const photo = {
    dataUrl: photoData.dataUrl,
    mealPlan: mealPlan,
    notes: notes,
    rating: rating,
    timestamp: new Date().toISOString()
  }

  return new Promise((resolve, reject) => {
    const request = objectStore.add(photo)
    request.onsuccess = () => {
      console.log('[Photos] Photo saved with ID:', request.result)
      haptic('success')
      showToast('📸 Photo saved!')
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })
}

// Get all photos for a meal plan
async function getMealPhotos(mealPlan) {
  if (!photoDb) {
    await initPhotoDatabase()
  }

  const transaction = photoDb.transaction(['photos'], 'readonly')
  const objectStore = transaction.objectStore('photos')
  const index = objectStore.index('mealPlan')

  return new Promise((resolve, reject) => {
    const request = index.getAll(mealPlan)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Get all photos
async function getAllPhotos() {
  if (!photoDb) {
    await initPhotoDatabase()
  }

  const transaction = photoDb.transaction(['photos'], 'readonly')
  const objectStore = transaction.objectStore('photos')

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// Delete photo
async function deleteMealPhoto(photoId) {
  if (!photoDb) {
    await initPhotoDatabase()
  }

  const transaction = photoDb.transaction(['photos'], 'readwrite')
  const objectStore = transaction.objectStore('photos')

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(photoId)
    request.onsuccess = () => {
      haptic('medium')
      showToast('Photo deleted')
      resolve()
    }
    request.onerror = () => reject(request.error)
  })
}

// Open camera interface
async function openCameraCapture(mealPlan, onPhotoCapture) {
  // Create camera modal
  const modal = document.createElement('div')
  modal.id = 'camera-modal'
  modal.className = 'fixed inset-0 bg-black z-[200] flex flex-col'

  modal.innerHTML = `
    <div class="flex-1 relative overflow-hidden">
      <video id="camera-video" autoplay playsinline class="w-full h-full object-cover"></video>

      <!-- Camera controls overlay -->
      <div class="absolute inset-0 pointer-events-none">
        <!-- Top bar -->
        <div class="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-auto">
          <div class="flex items-center justify-between">
            <button
              onclick="closeCameraCapture()"
              class="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <button
              onclick="switchCamera()"
              class="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Center focus indicator -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-64 h-64 border-2 border-white/50 rounded-lg"></div>
        </div>

        <!-- Bottom bar -->
        <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-auto" style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom))">
          <div class="flex items-center justify-center gap-8">
            <!-- Gallery button -->
            <button
              onclick="openPhotoGallery('${mealPlan}')"
              class="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </button>

            <!-- Capture button -->
            <button
              onclick="takeMealPhoto('${mealPlan}')"
              class="w-20 h-20 flex items-center justify-center bg-white rounded-full hover:bg-gray-100 transition shadow-lg relative"
            >
              <div class="w-16 h-16 bg-white border-4 border-gray-300 rounded-full"></div>
            </button>

            <!-- Placeholder for symmetry -->
            <div class="w-12 h-12"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Photo preview (hidden initially) -->
    <div id="photo-preview" class="hidden fixed inset-0 bg-black z-[210] flex flex-col">
      <div class="flex-1 relative overflow-hidden flex items-center justify-center">
        <img id="preview-image" src="" alt="Captured photo" class="max-w-full max-h-full object-contain">
      </div>

      <div class="p-6 bg-gray-900" style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom))">
        <textarea
          id="photo-notes"
          placeholder="Add notes about this meal... (optional)"
          rows="2"
          class="w-full px-4 py-3 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        ></textarea>

        <div class="flex gap-3">
          <button
            onclick="retakeMealPhoto()"
            class="flex-1 bg-white/20 backdrop-blur-sm text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition"
          >
            Retake
          </button>
          <button
            onclick="saveCapturedPhoto('${mealPlan}')"
            class="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-rose-600 transition shadow-lg"
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)
  document.body.style.overflow = 'hidden'

  // Initialize camera
  try {
    const stream = await initCamera()
    const video = document.getElementById('camera-video')
    video.srcObject = stream

    // Store stream for cleanup
    window.currentCameraStream = stream
    window.currentMealPlan = mealPlan
    window.onPhotoCaptureCallback = onPhotoCapture
  } catch (error) {
    closeCameraCapture()
  }
}

// Camera control functions
window.closeCameraCapture = function () {
  const modal = document.getElementById('camera-modal')
  if (modal) {
    // Stop camera stream
    if (window.currentCameraStream) {
      window.currentCameraStream.getTracks().forEach(track => track.stop())
      window.currentCameraStream = null
    }

    modal.remove()
    document.body.style.overflow = 'auto'
  }
}

window.switchCamera = async function () {
  const video = document.getElementById('camera-video')
  if (!video) return

  // Stop current stream
  if (window.currentCameraStream) {
    window.currentCameraStream.getTracks().forEach(track => track.stop())
  }

  // Toggle facing mode
  const currentFacingMode = window.cameraFacingMode || 'environment'
  const newFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment'
  window.cameraFacingMode = newFacingMode

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: newFacingMode }
    })
    video.srcObject = stream
    window.currentCameraStream = stream
    haptic('light')
  } catch (error) {
    console.error('[Camera] Switch failed:', error)
    showToast('Could not switch camera')
  }
}

window.takeMealPhoto = async function (mealPlan) {
  const video = document.getElementById('camera-video')
  if (!video) return

  try {
    const photoData = await capturePhoto(video)
    haptic('heavy')

    // Show preview
    const preview = document.getElementById('photo-preview')
    const previewImage = document.getElementById('preview-image')
    previewImage.src = photoData.dataUrl
    preview.classList.remove('hidden')

    // Store photo data temporarily
    window.capturedPhotoData = photoData
  } catch (error) {
    console.error('[Camera] Capture failed:', error)
    showToast('Failed to capture photo')
  }
}

window.retakeMealPhoto = function () {
  const preview = document.getElementById('photo-preview')
  preview.classList.add('hidden')
  window.capturedPhotoData = null
  document.getElementById('photo-notes').value = ''
}

window.saveCapturedPhoto = async function (mealPlan) {
  if (!window.capturedPhotoData) return

  const notes = document.getElementById('photo-notes').value

  try {
    const photoId = await saveMealPhoto(window.capturedPhotoData, mealPlan, notes)

    // Call callback if provided
    if (window.onPhotoCaptureCallback) {
      window.onPhotoCaptureCallback(photoId)
    }

    closeCameraCapture()
  } catch (error) {
    console.error('[Camera] Save failed:', error)
    showToast('Failed to save photo')
    haptic('error')
  }
}

// Photo gallery viewer
window.openPhotoGallery = async function (mealPlan = null) {
  try {
    const photos = mealPlan ? await getMealPhotos(mealPlan) : await getAllPhotos()

    if (photos.length === 0) {
      showToast('No photos yet. Take your first meal photo!')
      return
    }

    // Create gallery modal
    const modal = document.createElement('div')
    modal.id = 'photo-gallery-modal'
    modal.className = 'fixed inset-0 bg-slate-900 z-[200] flex flex-col'

    const photoCards = photos.map((photo, index) => {
      const date = new Date(photo.timestamp)
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })

      return `
        <div class="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div class="aspect-square relative">
            <img
              src="${photo.dataUrl}"
              alt="Meal photo"
              class="w-full h-full object-cover cursor-pointer"
              onclick="viewFullPhoto(${photo.id}, '${photo.dataUrl.replace(/'/g, '\\\'')}', '${(photo.notes || '').replace(/'/g, '\\\'')}', '${photo.mealPlan}')"
            >
          </div>
          <div class="p-3">
            <div class="text-white font-semibold text-sm mb-1">${photo.mealPlan}</div>
            <div class="text-slate-400 text-xs mb-2">${formattedDate} • ${formattedTime}</div>
            ${photo.notes ? `<div class="text-slate-300 text-sm">${photo.notes}</div>` : ''}
            <div class="flex gap-2 mt-3">
              <button
                onclick="sharePhoto(${photo.id})"
                class="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-lg transition"
              >
                Share
              </button>
              <button
                onclick="confirmDeletePhoto(${photo.id})"
                class="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')

    modal.innerHTML = `
      <div class="bg-slate-800 border-b border-slate-700 p-4" style="padding-top: calc(1rem + env(safe-area-inset-top))">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">Meal Photos</h2>
            <p class="text-slate-400 text-sm">${photos.length} photo${photos.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onclick="closePhotoGallery()"
            class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4" style="padding-bottom: calc(1rem + env(safe-area-inset-bottom))">
        <div class="grid grid-cols-2 gap-4">
          ${photoCards}
        </div>
      </div>
    `

    document.body.appendChild(modal)
    document.body.style.overflow = 'hidden'
  } catch (error) {
    console.error('[Gallery] Failed to load photos:', error)
    showToast('Failed to load photos')
  }
}

window.closePhotoGallery = function () {
  const modal = document.getElementById('photo-gallery-modal')
  if (modal) {
    modal.remove()
    document.body.style.overflow = 'auto'
  }
}

window.viewFullPhoto = function (photoId, dataUrl, notes, mealPlan) {
  const modal = document.createElement('div')
  modal.id = 'full-photo-modal'
  modal.className = 'fixed inset-0 bg-black z-[210] flex flex-col'

  modal.innerHTML = `
    <div class="bg-black/80 p-4 flex items-center justify-between" style="padding-top: calc(1rem + env(safe-area-inset-top))">
      <button
        onclick="closeFullPhoto()"
        class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="flex gap-2">
        <button
          onclick="sharePhoto(${photoId})"
          class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
        </button>
        <button
          onclick="confirmDeletePhoto(${photoId})"
          class="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-4">
      <img src="${dataUrl}" alt="Meal photo" class="max-w-full max-h-full object-contain">
    </div>

    ${notes
      ? `
      <div class="bg-black/80 p-4" style="padding-bottom: calc(1rem + env(safe-area-inset-bottom))">
        <div class="text-slate-400 text-xs mb-1">${mealPlan}</div>
        <div class="text-white">${notes}</div>
      </div>
    `
      : ''}
  `

  document.body.appendChild(modal)
}

window.closeFullPhoto = function () {
  const modal = document.getElementById('full-photo-modal')
  if (modal) {
    modal.remove()
  }
}

window.sharePhoto = async function (photoId) {
  try {
    if (!photoDb) await initPhotoDatabase()

    const transaction = photoDb.transaction(['photos'], 'readonly')
    const objectStore = transaction.objectStore('photos')

    const request = objectStore.get(photoId)
    request.onsuccess = async () => {
      const photo = request.result
      if (!photo) return

      // Convert dataUrl to blob
      const response = await fetch(photo.dataUrl)
      const blob = await response.blob()
      const file = new File([blob], `meal-${photo.mealPlan}-${Date.now()}.jpg`, { type: 'image/jpeg' })

      // Try native share
      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `Meal Photo - ${photo.mealPlan}`,
            text: photo.notes || 'Check out my meal!',
            files: [file]
          })
          haptic('success')
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error('[Share] Failed:', error)
            showToast('Failed to share photo')
          }
        }
      } else {
        showToast('Share not supported. Use screenshot instead.')
      }
    }
  } catch (error) {
    console.error('[Share] Error:', error)
    showToast('Failed to share photo')
  }
}

window.confirmDeletePhoto = function (photoId) {
  if (confirm('Delete this photo? This cannot be undone.')) {
    deletePhotoAndRefresh(photoId)
  }
}

window.deletePhotoAndRefresh = async function (photoId) {
  try {
    await deleteMealPhoto(photoId)

    // Close full photo view if open
    closeFullPhoto()

    // Refresh gallery
    const galleryModal = document.getElementById('photo-gallery-modal')
    if (galleryModal) {
      closePhotoGallery()
      setTimeout(() => openPhotoGallery(window.currentMealPlan), 300)
    }
  } catch (error) {
    console.error('[Delete] Failed:', error)
    showToast('Failed to delete photo')
  }
}

// Export camera functions
window.openCameraCapture = openCameraCapture
window.initCamera = initCamera
window.capturePhoto = capturePhoto
window.saveMealPhoto = saveMealPhoto
window.getMealPhotos = getMealPhotos
window.getAllPhotos = getAllPhotos
window.deleteMealPhoto = deleteMealPhoto

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileFeatures)
} else {
  initMobileFeatures()
}

function initMobileFeatures() {
  // Register service worker
  registerServiceWorker()

  // Initialize PWA install prompt
  initPWAInstallPrompt()

  // Initialize orientation detection
  initOrientationDetection()

  // Initialize dark mode
  initDarkMode()

  // Check for meal prep reminders
  checkMealPrepReminder()

  // Add haptic feedback to all buttons (opt-in via class)
  document.querySelectorAll('button, a, .haptic').forEach((element) => {
    element.addEventListener('click', () => {
      if (!element.classList.contains('no-haptic')) {
        haptic('light')
      }
    }, { passive: true })
  })

  console.log('[MobileUtils] Initialized')
}

// Export for use in other scripts
window.MobileUtils = {
  haptic,
  hapticLight,
  hapticMedium,
  hapticHeavy,
  hapticSuccess,
  hapticError,
  SwipeDetector,
  nativeShare,
  showToast,
  initPullToRefresh,
  startVoiceSearch,
  toggleDarkMode,
  showNotification,
  scheduleMealPrepReminder,
  openCameraCapture,
  openPhotoGallery,
  getMealPhotos,
  getAllPhotos,
  deleteMealPhoto
}
