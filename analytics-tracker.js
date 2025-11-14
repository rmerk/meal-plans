/**
 * Analytics Tracking Module
 * Tracks real user activity for meal planning analytics
 */

const ANALYTICS_EVENTS_KEY = 'meal_analytics_events';

class AnalyticsTracker {
    constructor() {
        this.events = this.loadEvents();
    }

    // Load events from localStorage
    loadEvents() {
        const saved = localStorage.getItem(ANALYTICS_EVENTS_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        // Initialize with empty structure
        return {
            mealPlanViews: [],
            cookingSessions: [],
            shoppingActivity: [],
            mealRatings: []
        };
    }

    // Save events to localStorage
    saveEvents() {
        try {
            localStorage.setItem(ANALYTICS_EVENTS_KEY, JSON.stringify(this.events));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error('Storage quota exceeded. Unable to save analytics.');
                // Keep only last 30 days of data
                this.pruneOldEvents(30);
                localStorage.setItem(ANALYTICS_EVENTS_KEY, JSON.stringify(this.events));
            }
        }
    }

    // Prune events older than specified days
    pruneOldEvents(days) {
        const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);

        this.events.mealPlanViews = this.events.mealPlanViews.filter(e => e.timestamp > cutoffTime);
        this.events.cookingSessions = this.events.cookingSessions.filter(e => e.startTime > cutoffTime);
        this.events.shoppingActivity = this.events.shoppingActivity.filter(e => e.timestamp > cutoffTime);
        this.events.mealRatings = this.events.mealRatings.filter(e => e.timestamp > cutoffTime);
    }

    /**
     * Track when a user views a meal plan page
     * @param {string} planName - Name of the meal plan (e.g., "Week 1 Meals")
     */
    trackMealPlanView(planName) {
        this.events.mealPlanViews.push({
            planName: planName,
            timestamp: Date.now()
        });
        this.saveEvents();
    }

    /**
     * Track when a user starts cooking mode
     * @param {string} planName - Name of the meal plan
     * @returns {string} sessionId - Unique ID for this cooking session
     */
    trackCookingStart(planName) {
        const sessionId = `${planName}-${Date.now()}`;
        this.events.cookingSessions.push({
            sessionId: sessionId,
            planName: planName,
            startTime: Date.now(),
            endTime: null,
            completed: false,
            elapsedSeconds: 0
        });
        this.saveEvents();
        return sessionId;
    }

    /**
     * Track when a user completes cooking mode
     * @param {string} sessionId - Session ID from trackCookingStart
     * @param {number} elapsedSeconds - Total time spent cooking
     * @param {boolean} completed - Whether all steps were completed
     */
    trackCookingComplete(sessionId, elapsedSeconds, completed = true) {
        const session = this.events.cookingSessions.find(s => s.sessionId === sessionId);
        if (session) {
            session.endTime = Date.now();
            session.elapsedSeconds = elapsedSeconds;
            session.completed = completed;
            this.saveEvents();
        }
    }

    /**
     * Track shopping list activity
     * @param {string} planName - Name of the meal plan
     * @param {number} itemsChecked - Number of items checked off
     * @param {number} totalItems - Total number of items in list
     */
    trackShoppingActivity(planName, itemsChecked, totalItems) {
        this.events.shoppingActivity.push({
            planName: planName,
            timestamp: Date.now(),
            itemsChecked: itemsChecked,
            totalItems: totalItems,
            completionPercent: Math.round((itemsChecked / totalItems) * 100)
        });
        this.saveEvents();
    }

    /**
     * Track meal rating from photo uploads
     * @param {string} planName - Name of the meal plan
     * @param {number} rating - Rating value (1-5)
     */
    trackMealRating(planName, rating) {
        this.events.mealRatings.push({
            planName: planName,
            rating: rating,
            timestamp: Date.now()
        });
        this.saveEvents();
    }

    /**
     * Get cooking streak (consecutive days with completed cooking sessions)
     * @returns {number} Current streak in days
     */
    getCookingStreak() {
        const completedSessions = this.events.cookingSessions
            .filter(s => s.completed && s.endTime)
            .sort((a, b) => b.endTime - a.endTime);

        if (completedSessions.length === 0) return 0;

        // Get unique days with completed sessions
        const uniqueDays = new Set();
        completedSessions.forEach(session => {
            const date = new Date(session.endTime);
            const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            uniqueDays.add(dayKey);
        });

        const sortedDays = Array.from(uniqueDays).sort().reverse();

        let streak = 0;
        let expectedDate = new Date();
        expectedDate.setHours(0, 0, 0, 0);

        for (const dayKey of sortedDays) {
            const [year, month, day] = dayKey.split('-').map(Number);
            const sessionDate = new Date(year, month, day);

            const daysDiff = Math.floor((expectedDate - sessionDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 0 || daysDiff === 1) {
                streak++;
                expectedDate = sessionDate;
            } else {
                break;
            }
        }

        return streak;
    }

    /**
     * Get meals cooked in the last N days
     * @param {number} days - Number of days to look back
     * @returns {number} Count of completed cooking sessions
     */
    getMealsCooked(days = 7) {
        const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
        return this.events.cookingSessions.filter(s =>
            s.completed && s.endTime && s.endTime >= cutoffTime
        ).length;
    }

    /**
     * Get average meal rating
     * @returns {number} Average rating (0-5)
     */
    getAverageRating() {
        if (this.events.mealRatings.length === 0) return 0;

        const sum = this.events.mealRatings.reduce((acc, r) => acc + r.rating, 0);
        return (sum / this.events.mealRatings.length).toFixed(1);
    }

    /**
     * Get meal history for display
     * @param {number} limit - Maximum number of entries to return
     * @returns {Array} Array of meal history objects
     */
    getMealHistory(limit = 30) {
        const completedSessions = this.events.cookingSessions
            .filter(s => s.completed && s.endTime)
            .sort((a, b) => b.endTime - a.endTime)
            .slice(0, limit);

        return completedSessions.map(session => {
            const rating = this.events.mealRatings.find(r =>
                r.planName === session.planName &&
                Math.abs(r.timestamp - session.endTime) < 3600000 // Within 1 hour
            );

            return {
                date: new Date(session.endTime).toISOString().split('T')[0],
                mealName: session.planName,
                rating: rating ? rating.rating : null,
                elapsedTime: session.elapsedSeconds
            };
        });
    }

    /**
     * Get nutrition data from completed cooking sessions
     * Uses actual meal plan data from plans.js
     * @param {number} days - Number of days to look back
     * @returns {Array} Array of nutrition log entries
     */
    getNutritionLog(days = 30) {
        const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
        const completedSessions = this.events.cookingSessions
            .filter(s => s.completed && s.endTime && s.endTime >= cutoffTime)
            .sort((a, b) => b.endTime - a.endTime);

        // Group by date
        const nutritionByDate = {};

        completedSessions.forEach(session => {
            const date = new Date(session.endTime).toISOString().split('T')[0];

            if (!nutritionByDate[date]) {
                nutritionByDate[date] = {
                    date: date,
                    meals: [],
                    totalProtein: 0,
                    totalCalories: 0,
                    totalCarbs: 0,
                    totalFats: 0
                };
            }

            // Find matching meal plan in mealPlans array (from plans.js)
            if (typeof mealPlans !== 'undefined') {
                const plan = mealPlans.find(p => p.title === session.planName);
                if (plan && plan.nutrition) {
                    nutritionByDate[date].meals.push(session.planName);
                    nutritionByDate[date].totalProtein += plan.nutrition.protein || 0;
                    nutritionByDate[date].totalCalories += plan.nutrition.calories || 0;
                    nutritionByDate[date].totalCarbs += plan.nutrition.carbs || 0;
                    nutritionByDate[date].totalFats += plan.nutrition.fats || 0;
                }
            }
        });

        return Object.values(nutritionByDate).sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );
    }

    /**
     * Get analytics summary for dashboard
     * @returns {Object} Summary statistics
     */
    getSummary() {
        return {
            totalViews: this.events.mealPlanViews.length,
            totalCookingSessions: this.events.cookingSessions.length,
            completedCookingSessions: this.events.cookingSessions.filter(s => s.completed).length,
            currentStreak: this.getCookingStreak(),
            mealsThisWeek: this.getMealsCooked(7),
            averageRating: this.getAverageRating(),
            shoppingListsChecked: this.events.shoppingActivity.length
        };
    }

    /**
     * Clear all analytics data
     */
    clearAllData() {
        this.events = {
            mealPlanViews: [],
            cookingSessions: [],
            shoppingActivity: [],
            mealRatings: []
        };
        this.saveEvents();
    }
}

// Create global instance
const analyticsTracker = new AnalyticsTracker();

// Expose globally for use in other scripts
window.analyticsTracker = analyticsTracker;
