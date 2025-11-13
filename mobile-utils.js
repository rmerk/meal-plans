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
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('[PWA] Service Worker registered:', registration.scope);

      // Check for updates periodically
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[PWA] New Service Worker found, installing...');

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available, show update prompt
            showUpdateNotification();
          }
        });
      });

      return registration;
    } catch (error) {
      console.error('[PWA] Service Worker registration failed:', error);
    }
  }
}

function showUpdateNotification() {
  // Simple banner notification (can be enhanced with custom UI)
  const banner = document.createElement('div');
  banner.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg z-[200] flex items-center gap-3';
  banner.innerHTML = `
    <span>New version available!</span>
    <button onclick="location.reload()" class="bg-white/20 px-4 py-1 rounded-full hover:bg-white/30 transition">
      Update
    </button>
  `;
  document.body.appendChild(banner);

  setTimeout(() => banner.remove(), 10000);
}

// ============================================================================
// PWA INSTALL PROMPT
// ============================================================================

let deferredPrompt;

function initPWAInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    deferredPrompt = e;

    // Show custom install button/banner
    showInstallPromotion();
  });

  // Track when app is installed
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    deferredPrompt = null;
    hideInstallPromotion();

    // Send analytics event (if implemented)
    if (typeof logEvent === 'function') {
      logEvent('pwa_installed');
    }
  });
}

function showInstallPromotion() {
  // Check if user has dismissed the prompt before
  if (localStorage.getItem('pwa-install-dismissed') === 'true') {
    return;
  }

  const installBanner = document.createElement('div');
  installBanner.id = 'pwa-install-banner';
  installBanner.className = 'fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-br from-orange-500 to-rose-500 text-white rounded-2xl shadow-2xl p-4 z-[150] animate-slide-up';
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
  `;

  document.body.appendChild(installBanner);
}

function hideInstallPromotion() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.remove();
  }
}

window.installPWA = async function() {
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log('[PWA] User choice:', outcome);

  deferredPrompt = null;
  hideInstallPromotion();
};

window.dismissInstallPromotion = function() {
  localStorage.setItem('pwa-install-dismissed', 'true');
  hideInstallPromotion();
};

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
};

function haptic(pattern = 'light') {
  // Check if user has disabled haptics
  if (localStorage.getItem('haptics-disabled') === 'true') {
    return;
  }

  if ('vibrate' in navigator) {
    const vibrationPattern = HapticPatterns[pattern] || pattern;
    navigator.vibrate(vibrationPattern);
  }
}

// Convenience functions
window.hapticLight = () => haptic('light');
window.hapticMedium = () => haptic('medium');
window.hapticHeavy = () => haptic('heavy');
window.hapticSuccess = () => haptic('success');
window.hapticError = () => haptic('error');
window.hapticSelection = () => haptic('selection');

// ============================================================================
// SWIPE GESTURE DETECTION
// ============================================================================

class SwipeDetector {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      threshold: 50,           // Minimum distance for swipe
      restraint: 100,          // Maximum perpendicular distance
      allowedTime: 500,        // Maximum time for swipe
      onSwipeLeft: null,
      onSwipeRight: null,
      onSwipeUp: null,
      onSwipeDown: null,
      ...options
    };

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.startTime = 0;

    this.init();
  }

  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  handleTouchStart(e) {
    const touch = e.changedTouches[0];
    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    this.startTime = Date.now();
  }

  handleTouchMove(e) {
    // Prevent default to stop scrolling while swiping (if configured)
    if (this.options.preventScroll) {
      e.preventDefault();
    }
  }

  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    this.touchEndX = touch.pageX;
    this.touchEndY = touch.pageY;

    this.handleSwipe();
  }

  handleSwipe() {
    const elapsedTime = Date.now() - this.startTime;

    // Check if swipe was fast enough
    if (elapsedTime > this.options.allowedTime) {
      return;
    }

    const distanceX = this.touchEndX - this.touchStartX;
    const distanceY = this.touchEndY - this.touchStartY;

    // Determine if horizontal swipe
    if (Math.abs(distanceX) >= this.options.threshold && Math.abs(distanceY) <= this.options.restraint) {
      if (distanceX > 0 && this.options.onSwipeRight) {
        haptic('selection');
        this.options.onSwipeRight();
      } else if (distanceX < 0 && this.options.onSwipeLeft) {
        haptic('selection');
        this.options.onSwipeLeft();
      }
    }
    // Determine if vertical swipe
    else if (Math.abs(distanceY) >= this.options.threshold && Math.abs(distanceX) <= this.options.restraint) {
      if (distanceY > 0 && this.options.onSwipeDown) {
        haptic('selection');
        this.options.onSwipeDown();
      } else if (distanceY < 0 && this.options.onSwipeUp) {
        haptic('selection');
        this.options.onSwipeUp();
      }
    }
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

window.SwipeDetector = SwipeDetector;

// ============================================================================
// PULL TO REFRESH
// ============================================================================

function initPullToRefresh(callback) {
  let touchStartY = 0;
  let touchEndY = 0;
  let isPulling = false;

  document.addEventListener('touchstart', (e) => {
    // Only trigger if at top of page
    if (window.scrollY === 0) {
      touchStartY = e.touches[0].clientY;
      isPulling = true;
    }
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;

    touchEndY = e.touches[0].clientY;
    const pullDistance = touchEndY - touchStartY;

    // Show visual indicator when pulled down enough
    if (pullDistance > 80) {
      // Add visual feedback (can be enhanced with custom UI)
      document.body.style.transform = `translateY(${Math.min(pullDistance - 80, 40)}px)`;
      document.body.style.transition = 'none';
    }
  }, { passive: true });

  document.addEventListener('touchend', () => {
    if (!isPulling) return;

    const pullDistance = touchEndY - touchStartY;

    // Reset visual state
    document.body.style.transform = '';
    document.body.style.transition = 'transform 0.3s ease';

    // Trigger refresh if pulled far enough
    if (pullDistance > 120) {
      haptic('medium');
      if (callback) callback();
    }

    isPulling = false;
    touchStartY = 0;
    touchEndY = 0;
  }, { passive: true });
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
      });
      haptic('success');
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('[Share] Failed:', error);
      }
      return false;
    }
  } else {
    // Fallback to copy to clipboard
    return copyToClipboard(data.text || data.url || window.location.href);
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    haptic('success');
    showToast('Copied to clipboard!');
    return true;
  } catch (error) {
    console.error('[Clipboard] Failed:', error);
    return false;
  }
}

function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-[200] animate-fade-in';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

window.nativeShare = nativeShare;
window.showToast = showToast;

// ============================================================================
// LANDSCAPE MODE DETECTION & HANDLING
// ============================================================================

let currentOrientation = 'portrait';

function detectOrientation() {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  const newOrientation = isLandscape ? 'landscape' : 'portrait';

  if (newOrientation !== currentOrientation) {
    currentOrientation = newOrientation;
    document.body.classList.remove('orientation-portrait', 'orientation-landscape');
    document.body.classList.add(`orientation-${newOrientation}`);

    // Dispatch custom event for pages to react
    window.dispatchEvent(new CustomEvent('orientationchange', {
      detail: { orientation: newOrientation }
    }));

    console.log('[MobileUtils] Orientation changed to:', newOrientation);
  }
}

function initOrientationDetection() {
  detectOrientation();
  window.addEventListener('resize', detectOrientation);
  window.addEventListener('orientationchange', detectOrientation);
}

// ============================================================================
// DARK MODE
// ============================================================================

function initDarkMode() {
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Apply theme
  setTheme(theme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  // Dispatch event for custom reactions
  window.dispatchEvent(new CustomEvent('themechange', {
    detail: { theme }
  }));
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  haptic('medium');
  return newTheme;
}

window.toggleDarkMode = toggleDarkMode;

// ============================================================================
// VOICE SEARCH (WEB SPEECH API)
// ============================================================================

function startVoiceSearch(callback) {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Voice search not supported in this browser');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    showToast('🎤 Listening...', 5000);
    haptic('medium');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    haptic('success');
    if (callback) callback(transcript);
  };

  recognition.onerror = (event) => {
    console.error('[VoiceSearch] Error:', event.error);
    haptic('error');
    showToast('Voice search failed. Please try again.');
  };

  recognition.onend = () => {
    console.log('[VoiceSearch] Ended');
  };

  try {
    recognition.start();
  } catch (error) {
    console.error('[VoiceSearch] Start failed:', error);
    showToast('Could not start voice search');
  }

  return recognition;
}

window.startVoiceSearch = startVoiceSearch;

// ============================================================================
// NOTIFICATION SYSTEM
// ============================================================================

async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('[Notifications] Not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

async function showNotification(title, options = {}) {
  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    console.log('[Notifications] Permission denied');
    return;
  }

  const defaultOptions = {
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: false,
    ...options
  };

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    // Use service worker for better control
    const registration = await navigator.serviceWorker.ready;
    return registration.showNotification(title, defaultOptions);
  } else {
    // Fallback to regular notification
    return new Notification(title, defaultOptions);
  }
}

function scheduleMealPrepReminder(dayOfWeek = 0, hour = 9, minute = 0) {
  // Save reminder preference
  const reminder = { dayOfWeek, hour, minute, enabled: true };
  localStorage.setItem('meal_prep_reminder', JSON.stringify(reminder));

  showToast('Meal prep reminder set!');
  haptic('success');

  // Note: Actual scheduling requires service worker with periodic background sync
  // For now, we'll check on page load and show reminders
}

function checkMealPrepReminder() {
  const reminderData = localStorage.getItem('meal_prep_reminder');
  if (!reminderData) return;

  const reminder = JSON.parse(reminderData);
  if (!reminder.enabled) return;

  const now = new Date();
  const lastShown = localStorage.getItem('last_reminder_shown');
  const lastShownDate = lastShown ? new Date(lastShown) : null;

  // Only show once per day
  if (lastShownDate && now.toDateString() === lastShownDate.toDateString()) {
    return;
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
    });

    localStorage.setItem('last_reminder_shown', now.toISOString());
  }
}

window.scheduleMealPrepReminder = scheduleMealPrepReminder;
window.showNotification = showNotification;

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileFeatures);
} else {
  initMobileFeatures();
}

function initMobileFeatures() {
  // Register service worker
  registerServiceWorker();

  // Initialize PWA install prompt
  initPWAInstallPrompt();

  // Initialize orientation detection
  initOrientationDetection();

  // Initialize dark mode
  initDarkMode();

  // Check for meal prep reminders
  checkMealPrepReminder();

  // Add haptic feedback to all buttons (opt-in via class)
  document.querySelectorAll('button, a, .haptic').forEach(element => {
    element.addEventListener('click', () => {
      if (!element.classList.contains('no-haptic')) {
        haptic('light');
      }
    }, { passive: true });
  });

  console.log('[MobileUtils] Initialized');
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
  scheduleMealPrepReminder
};
