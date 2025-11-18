# Story 1.3 Verification Testing Guide

**Date:** 2025-11-17
**Story:** 1.3 - Set up PWA with Basic Service Worker
**Production Server:** ✅ Running at http://localhost:4000
**Tester:** Ryan

---

## Pre-Test Checklist

✅ Production build generated (.output/public/)
✅ Production server running: `npx serve .output/public -l 4000`
✅ Server responding at http://localhost:4000
✅ Chrome DevTools available (recommended browser for testing)

---

## Verification Task 5: Service Worker Registration in DevTools

### Steps to Complete:

1. **Open App in Chrome:**
   - Navigate to: http://localhost:4000
   - Wait for page to fully load

2. **Open Chrome DevTools:**
   - Press: `Cmd+Option+I` (Mac) or `F12` (Windows/Linux)
   - Or: Right-click → Inspect

3. **Check Service Worker Tab:**
   - DevTools → **Application** tab (top menu)
   - Left sidebar → **Service Workers** section
   - **Verify:**
     - [ ] Service worker shows **"activated and running"** status
     - [ ] Service worker URL is `/sw.js`
     - [ ] Scope is `/` (root)
     - [ ] No errors in console

4. **Check Manifest Tab:**
   - DevTools → Application tab
   - Left sidebar → **Manifest** section
   - **Verify all properties:**
     - [ ] **name:** "Meal Plans"
     - [ ] **short_name:** "Meals"
     - [ ] **description:** "Weekly meal planning with batch cooking strategies"
     - [ ] **theme_color:** #192E59 (Mountains at Sunrise Deep Blue)
     - [ ] **background_color:** #F2CC85 (Mountains at Sunrise Gold)
     - [ ] **display:** standalone
     - [ ] **start_url:** /
     - [ ] **icons:** Two icons listed
       - [ ] 192x192 icon: /icons/icon-192.png
       - [ ] 512x512 icon: /icons/icon-512.png
     - [ ] Icon preview images load correctly

5. **Check Cache Storage:**
   - DevTools → Application tab
   - Left sidebar → **Cache Storage** section
   - **Verify caches exist:**
     - [ ] `workbox-precache-v2-http://localhost:4000/` cache exists
     - [ ] Expand cache, verify files cached:
       - [ ] HTML files (/, /theme-test)
       - [ ] _nuxt/*.js files
       - [ ] Icons (/icons/icon-192.png, icon-512.png)
       - [ ] favicon.ico
     - [ ] Total cached files: ~23 files

### Expected Results:

✅ Service worker **activated and running**
✅ Manifest contains all required PWA properties
✅ Theme colors match Mountains at Sunrise palette
✅ Icons display correctly in DevTools preview
✅ 23 files precached on service worker install

### What to Document:

```markdown
**Task 5 Results:**
- Service Worker Status: [activated/error/not registered]
- Manifest Properties: [all correct/issues found]
- Precached Files: [~23 files/different count]
- Icons Display: [correctly/broken]
- Console Errors: [none/list errors]
```

---

## Verification Task 6: Lighthouse PWA Audit (AC #5) ⚠️ BLOCKING

### Steps to Complete:

1. **Ensure Production Server Running:**
   - Server should be at: http://localhost:4000
   - Fresh browser session recommended (or clear cache)

2. **Open Lighthouse in DevTools:**
   - DevTools → **Lighthouse** tab (top menu)
   - If not visible: Click `>>` and select Lighthouse

3. **Configure Lighthouse:**
   - **Mode:** Navigation (default)
   - **Categories:** Check **Progressive Web App** only (uncheck others for speed)
   - **Device:** Desktop or Mobile (test both if time permits)
   - Leave other settings default

4. **Run Audit:**
   - Click **"Analyze page load"** button
   - Wait 10-30 seconds for audit to complete
   - Do not interact with page during audit

5. **Review PWA Score:**
   - **Target Score:** 100 (perfect score)
   - **Verify all criteria pass:**
     - [ ] ✅ Installable
     - [ ] ✅ Service worker registered
     - [ ] ✅ Offline capability
     - [ ] ✅ Page redirects HTTP to HTTPS (N/A for localhost)
     - [ ] ✅ Has a `<meta name="viewport">` tag
     - [ ] ✅ Contains start_url in manifest
     - [ ] ✅ Has themed omnibox
     - [ ] ✅ Manifest includes maskable icon (optional)
     - [ ] ✅ Content sized correctly for viewport

6. **Take Screenshot:**
   - Scroll to show "Progressive Web App" score at top
   - Screenshot the full Lighthouse report
   - Save as: `docs/sprint-artifacts/1-3-lighthouse-pwa-audit.png`

7. **Review Failed Criteria (if any):**
   - Expand any red/yellow items
   - Document failure reasons
   - Note if they're blockers or acceptable

### Expected Results:

✅ PWA Score: **100** (perfect)
✅ All PWA criteria pass (green checkmarks)
✅ No critical failures
✅ Installable badge shown in omnibox

### What to Document:

```markdown
**Task 6 Results:**
- PWA Score: [100 / actual score]
- Desktop Score: [100 / actual]
- Mobile Score: [100 / actual] (if tested)
- Failed Criteria: [none / list failures]
- Screenshot: ✅ Saved to docs/sprint-artifacts/1-3-lighthouse-pwa-audit.png

**Lighthouse Details:**
- Performance: [score]
- Accessibility: [score]
- Best Practices: [score]
- SEO: [score]
```

### Troubleshooting:

**If PWA score < 100:**

- **Missing viewport tag:** Should be present (verified in HTML)
- **Service worker not registered:** Check console for errors
- **Manifest errors:** Verify manifest.webmanifest loads correctly
- **Icons missing:** Check /icons/icon-192.png and icon-512.png load
- **HTTPS required:** Should pass on localhost (exempt from HTTPS)

---

## Verification Task 7: Offline Functionality (AC #6) ⚠️ BLOCKING

### Steps to Complete:

1. **Load App Online (Fresh Start):**
   - Open new Chrome tab
   - Navigate to: http://localhost:4000
   - Wait for page to fully load
   - Service worker should install (check DevTools Application → Service Workers)

2. **Navigate to Multiple Pages:**
   - Click around to cache pages:
     - [ ] Home page (/)
     - [ ] Theme Test page (/theme-test)
     - [ ] Any other pages available
   - Wait for each page to fully load

3. **Verify Caching Happened:**
   - DevTools → Application → Cache Storage
   - Expand workbox-precache cache
   - Verify pages you visited are cached
   - Note: First visit precaches, navigation adds to runtime cache

4. **Go Offline:**
   - DevTools → **Network** tab
   - Top of Network tab: Find **"No throttling"** dropdown
   - Change to: **"Offline"**
   - Page should remain functional (you're now offline)

5. **Test Offline Navigation:**
   - [ ] Refresh page (Cmd+R) - page should load from cache
   - [ ] Navigate to home (/) - should load
   - [ ] Navigate to /theme-test - should load
   - [ ] Check that images load (icons, favicon)
   - [ ] Check that CSS loads (page styled correctly)
   - [ ] Check that JS loads (page interactive)

6. **Test Service Worker Fallback:**
   - Try navigating to non-existent page (e.g., /nonexistent)
   - Should fallback to / (navigateFallback configured)

7. **Return Online:**
   - DevTools → Network tab → Change "Offline" back to "No throttling"
   - Verify app still works
   - Verify updates fetch when back online (if service worker updates)

### Expected Results:

✅ Pages load completely when offline
✅ All visited pages navigate correctly
✅ Images (icons, favicon) load from cache
✅ CSS styling preserved offline
✅ JavaScript functionality works offline
✅ Non-existent pages fallback to home (/)

### What to Document:

```markdown
**Task 7 Results:**
- Initial Load Online: [success/failure]
- Pages Visited Online: [/, /theme-test, ...]
- Offline Refresh: [loaded from cache/error]
- Offline Navigation: [all pages work/some fail]
- Images Offline: [loaded from cache/broken]
- CSS Offline: [styled correctly/unstyled]
- JS Offline: [functional/non-functional]
- Fallback Behavior: [works/doesn't work]
- Back Online: [works/issues]
```

### Troubleshooting:

**If offline doesn't work:**

- **Service worker not activated:** Wait for activation, then retry
- **Pages not cached:** Visit pages online first before going offline
- **Cache miss:** Check Network tab for failed requests (red)
- **Service worker error:** Check Console tab for errors

---

## Verification Task 8: PWA Install Behavior

### Steps to Complete:

1. **Check Install Prompt Availability:**
   - Look in Chrome address bar (omnibox)
   - **Desktop:** Install icon ⊕ should appear on right side
   - **Mobile:** "Add to Home Screen" option in browser menu
   - If icon doesn't appear: Wait 30 seconds, refresh page

2. **Install PWA (Desktop):**
   - Click install icon ⊕ in address bar
   - Install prompt dialog should appear
   - **Verify prompt shows:**
     - [ ] App name: "Meal Plans"
     - [ ] Icon preview (192x192)
     - [ ] Install button
   - Click **"Install"** button

3. **Verify Installed App:**
   - App should open in new window
   - **Verify standalone mode:**
     - [ ] No browser address bar visible
     - [ ] No browser tabs visible
     - [ ] No browser navigation buttons (back/forward)
     - [ ] App runs in its own window
     - [ ] Window title: "Meal Plans"

4. **Check App Icon:**
   - Mac: Dock or Applications folder
   - Windows: Start Menu or Desktop
   - **Verify:**
     - [ ] Icon displays correctly (192x192 or 512x512)
     - [ ] Icon uses Mountains at Sunrise colors

5. **Test Theme Colors:**
   - **Verify theme_color applied:**
     - [ ] Window title bar color (if applicable)
     - [ ] Task switcher icon background
     - [ ] Splash screen background (may need to restart app)

6. **Test App Functionality:**
   - Navigate around installed app
   - **Verify:**
     - [ ] All pages work in standalone mode
     - [ ] Navigation works
     - [ ] Styling preserved
     - [ ] No browser UI elements visible

7. **Uninstall (Cleanup):**
   - Click ⋮ (three dots) in app window
   - Select "Uninstall [App Name]"
   - Or: chrome://apps → right-click → Remove

### Expected Results:

✅ Install prompt appears in address bar
✅ Install dialog shows correct app name and icon
✅ App opens in standalone mode (no browser UI)
✅ App icon displays correctly in system
✅ Theme colors applied to browser chrome
✅ App fully functional in standalone mode

### What to Document:

```markdown
**Task 8 Results:**
- Install Prompt: [appeared/didn't appear]
- App Name in Prompt: ["Meal Plans"/different]
- Icon in Prompt: [correct/broken]
- Standalone Mode: [yes/no browser UI visible]
- App Icon on System: [correct/broken]
- Theme Colors: [applied/not visible]
- App Functionality: [fully working/issues]
```

---

## Acceptance Verification Checklist

After completing Tasks 5-8, verify all acceptance criteria:

### AC #1: PWA Manifest Generated ✅ (Code Verified)

- [x] name: "Meal Plans"
- [x] theme_color: #192E59
- [x] background_color: #F2CC85
- [x] display: standalone
- [x] icons: 192x192, 512x512

### AC #2: Service Worker Registered ✅ (Code Verified)

- [x] Service worker file generated
- [x] Offline-first caching strategy configured
- [ ] **[Task 5]** Service worker shows "activated and running" in DevTools

### AC #3: Static Assets Use Cache-First ✅ (Code Verified)

- [x] globPatterns configured for CSS, JS, images
- [x] precacheAndRoute() in sw.js
- [ ] **[Task 5]** 23 files precached in Cache Storage

### AC #4: HTML Uses Network-First ✅ (Code Verified)

- [x] NetworkFirst handler configured
- [x] 5s network timeout
- [ ] **[Task 7]** HTML pages load offline (cache fallback works)

### AC #5: Lighthouse PWA Score = 100 ⚠️ **BLOCKING**

- [ ] **[Task 6]** Lighthouse PWA audit run
- [ ] **[Task 6]** PWA score = 100 achieved
- [ ] **[Task 6]** Screenshot documented

### AC #6: Offline Functionality ⚠️ **BLOCKING**

- [ ] **[Task 7]** App loads when offline
- [ ] **[Task 7]** All cached pages navigate offline
- [ ] **[Task 7]** Images, CSS, JS load from cache

---

## Post-Testing: Document Results

After completing all verification tasks, update the story file:

### 1. Mark Verification Tasks Complete

Edit: `docs/sprint-artifacts/1-3-set-up-pwa-with-basic-service-worker.md`

Update Verification Tasks section:
```markdown
- [x] Task 5: Verify service worker registration in DevTools
- [x] Task 6: Run Lighthouse PWA audit (AC #5)
- [x] Task 7: Test offline functionality (AC #6)
- [x] Task 8: Test PWA install behavior
```

### 2. Check Acceptance Verification Checklist

Mark runtime-verified ACs complete:
```markdown
- [x] **AC #5:** Lighthouse PWA audit score = 100
- [x] **AC #6:** Offline functionality verified
```

### 3. Add Test Results to Dev Notes

Create new section in Dev Notes:
```markdown
### Verification Test Results (2025-11-17)

**Task 5 - Service Worker Registration:**
- Service Worker Status: [result]
- Manifest Properties: [result]
- Precached Files: [count]

**Task 6 - Lighthouse PWA Audit:**
- PWA Score: [100]
- Screenshot: docs/sprint-artifacts/1-3-lighthouse-pwa-audit.png
- All criteria: [passed/failed list]

**Task 7 - Offline Functionality:**
- Offline page loads: [success]
- Navigation offline: [success]
- Assets cached: [success]

**Task 8 - PWA Install:**
- Install prompt: [appeared]
- Standalone mode: [working]
- Theme colors: [applied]
```

### 4. Update Story Status

If all tasks complete and all ACs verified:
```bash
# Update sprint-status.yaml
1-3-set-up-pwa-with-basic-service-worker: done
```

If any issues found:
```bash
# Update sprint-status.yaml (keep in-progress)
# Add "Review Follow-ups" section to story with issues found
```

---

## Quick Command Reference

```bash
# Start production server
npx serve .output/public -l 3000

# Stop production server
# Find process: lsof -i :3000
# Kill: kill -9 [PID]

# Rebuild if needed
pnpm generate

# Check service worker in CLI
curl -I http://localhost:4000/sw.js

# Check manifest in CLI
curl http://localhost:4000/manifest.webmanifest
```

---

## Troubleshooting Common Issues

### Service Worker Won't Register
- Clear browser cache: DevTools → Application → Clear Storage → Clear site data
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check Console for errors

### Lighthouse Score < 100
- Verify HTTPS (localhost is exempt)
- Check all manifest properties correct
- Ensure icons load correctly
- Verify viewport meta tag exists

### Offline Mode Doesn't Work
- Service worker must be "activated" first (check DevTools)
- Visit pages online before going offline
- Wait for precaching to complete (~23 files)

### Install Prompt Not Appearing
- Wait 30 seconds after page load
- Refresh page
- Check Lighthouse "Installable" criteria
- Some browsers suppress prompt after multiple dismissals

---

**Testing Status:** ⏳ Ready to Begin
**Server Running:** ✅ http://localhost:4000
**Next Step:** Complete Task 5 (Service Worker Verification)

---

**Good luck with testing! 🚀**
