/**
 * Notification System for Meal Planning App
 * Handles meal prep reminders, cooking timers, and configurable quiet hours
 */

const NOTIFICATIONS_KEY = 'meal_plan_notifications';
const NOTIFICATION_SETTINGS_KEY = 'meal_plan_notification_settings';

// Default notification settings
const DEFAULT_SETTINGS = {
    enabled: true,
    mealPrepReminders: true,
    cookingTimers: true,
    weeklyPrepDay: 0, // Sunday
    weeklyPrepTime: '10:00',
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    reminderLeadTime: 60 // minutes before cooking time
};

class NotificationManager {
    constructor() {
        this.settings = this.loadSettings();
        this.initializeNotifications();
    }

    // Load settings from localStorage
    loadSettings() {
        const saved = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
        return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    }

    // Save settings to localStorage
    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(this.settings));
    }

    // Initialize notification system
    async initializeNotifications() {
        // Request notification permission if not already granted
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }

        // Schedule recurring reminders
        this.scheduleWeeklyReminder();
    }

    // Check if we're in quiet hours
    isQuietHours() {
        if (!this.settings.quietHoursEnabled) return false;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const start = this.settings.quietHoursStart;
        const end = this.settings.quietHoursEnd;

        // Handle quiet hours spanning midnight
        if (start > end) {
            return currentTime >= start || currentTime < end;
        } else {
            return currentTime >= start && currentTime < end;
        }
    }

    // Send a notification
    async sendNotification(title, body, options = {}) {
        // Check if notifications are enabled
        if (!this.settings.enabled) return false;

        // Check quiet hours
        if (this.isQuietHours()) {
            console.log('Notification suppressed due to quiet hours');
            return false;
        }

        // Check browser support
        if (!('Notification' in window)) {
            console.log('Notifications not supported');
            return false;
        }

        // Check permission
        if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return false;
        }

        // Send notification
        const notification = new Notification(title, {
            body: body,
            icon: '/icon.svg',
            badge: '/icon.svg',
            vibrate: [200, 100, 200],
            tag: options.tag || 'meal-plan',
            renotify: options.renotify || false,
            requireInteraction: options.requireInteraction || false,
            ...options
        });

        // Add click handler
        notification.onclick = () => {
            window.focus();
            if (options.onClick) options.onClick();
            notification.close();
        };

        return true;
    }

    // Schedule weekly meal prep reminder
    scheduleWeeklyReminder() {
        if (!this.settings.mealPrepReminders) return;

        const checkReminder = () => {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            // Check if it's the right day and time (within 5 minute window)
            if (dayOfWeek === this.settings.weeklyPrepDay &&
                Math.abs(this.timeToMinutes(currentTime) - this.timeToMinutes(this.settings.weeklyPrepTime)) < 5) {

                this.sendNotification(
                    '🍳 Meal Prep Time!',
                    'It\'s time to prep your meals for the week. Check your meal plans to get started.',
                    {
                        tag: 'weekly-meal-prep',
                        requireInteraction: true,
                        onClick: () => {
                            window.location.href = '/index.html';
                        }
                    }
                );
            }
        };

        // Check every minute
        setInterval(checkReminder, 60000);
        checkReminder(); // Check immediately
    }

    // Send cooking timer notification
    sendCookingTimer(mealName, minutesRemaining) {
        if (!this.settings.cookingTimers) return;

        let title, body;
        if (minutesRemaining === 0) {
            title = '⏰ Timer Complete!';
            body = `${mealName} should be ready now.`;
        } else if (minutesRemaining === 1) {
            title = '⏰ 1 Minute Remaining';
            body = `Your ${mealName} has 1 minute left.`;
        } else {
            title = `⏰ ${minutesRemaining} Minutes Remaining`;
            body = `Your ${mealName} has ${minutesRemaining} minutes left.`;
        }

        this.sendNotification(title, body, {
            tag: `timer-${mealName}`,
            requireInteraction: minutesRemaining === 0,
            vibrate: minutesRemaining === 0 ? [200, 100, 200, 100, 200] : [200, 100, 200]
        });
    }

    // Send reminder before cooking time
    sendCookingReminder(mealName, cookingTime) {
        if (!this.settings.mealPrepReminders) return;

        const now = new Date();
        const cookTime = new Date(cookingTime);
        const minutesUntil = Math.floor((cookTime - now) / 60000);

        if (minutesUntil === this.settings.reminderLeadTime) {
            this.sendNotification(
                '🔔 Cooking Reminder',
                `Time to start cooking ${mealName} in ${this.settings.reminderLeadTime} minutes.`,
                {
                    tag: 'cooking-reminder',
                    onClick: () => {
                        window.location.href = '/index.html';
                    }
                }
            );
        }
    }

    // Helper: Convert time string to minutes since midnight
    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Test notification (for settings page)
    async testNotification() {
        return await this.sendNotification(
            '✅ Test Notification',
            'Notifications are working! You\'ll receive reminders for meal prep and cooking.',
            { tag: 'test' }
        );
    }
}

// Create global instance
const notificationManager = new NotificationManager();

// Expose functions globally
window.notificationManager = notificationManager;
window.sendCookingTimer = (mealName, minutesRemaining) => {
    notificationManager.sendCookingTimer(mealName, minutesRemaining);
};
window.testNotification = async () => {
    try {
        const success = await notificationManager.testNotification();

        // Provide feedback based on the result
        if (success) {
            if (window.showToast) {
                showToast('✅ Test notification sent!');
            } else {
                alert('Test notification sent successfully!');
            }
        } else {
            // Notification was blocked or failed
            const reason = Notification.permission === 'denied'
                ? 'Notification permission was denied. Please enable notifications in your browser settings.'
                : 'Notification failed. Make sure notifications are enabled in your browser.';

            if (window.showToast) {
                showToast('❌ ' + reason);
            } else {
                alert(reason);
            }
        }
    } catch (error) {
        console.error('Test notification error:', error);
        if (window.showToast) {
            showToast('❌ Error sending test notification');
        } else {
            alert('Error sending test notification: ' + error.message);
        }
    }
};
