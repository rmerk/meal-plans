# Production Server - Port 4000 (Standard)

**Date:** 2025-11-17
**Project:** meal-plans
**Story:** 1.3 - Set up PWA with Basic Service Worker

## Configuration

**Standard Port:** `4000`

## Rationale

Port 4000 was chosen as the permanent production server port for the following reasons:

1. **Avoids macOS Control Center Conflict**
   - macOS uses port 5000 for Control Center
   - Control Center automatically respawns if killed
   - Port 5000 causes persistent conflicts on macOS systems

2. **Avoids Common Development Ports**
   - Port 3000: Often used by default dev servers (Create React App, Next.js, etc.)
   - Port 3001-3002: Commonly used for parallel dev instances
   - Port 4000: Less commonly used, reduces conflicts

3. **Consistent Testing Environment**
   - All PWA testing documentation references port 4000
   - Lighthouse audits consistent across test runs
   - Service worker cache keys consistent (includes port in origin)

## Usage

### Start Production Server

```bash
npx serve .output/public -l 4000
```

### Verify Server Running

```bash
lsof -i:4000
# Should show serve process listening on port 4000
```

### Access Application

```
http://localhost:4000
```

## Testing References

- **Verification Guide:** `docs/sprint-artifacts/1-3-verification-testing-guide.md`
- **Story File:** `docs/sprint-artifacts/1-3-set-up-pwa-with-basic-service-worker.md`

## Service Worker Considerations

**Important:** Service worker cache keys include the full origin (protocol + host + port).

Changing ports will create separate service worker registrations:
- `http://localhost:3000` → Different SW registration
- `http://localhost:4000` → Different SW registration
- `http://localhost:5000` → Different SW registration

**Recommendation:** Always use port 4000 for production build testing to maintain consistent service worker state.

## Alternative Ports (If 4000 Unavailable)

If port 4000 is in use, recommended alternatives in order:
1. **Port 8000** - Common static server alternative
2. **Port 8080** - Traditional HTTP alternative port
3. **Port 3000** - Fall back to common dev port

Update all documentation references if changing from 4000.

---

**Status:** ✅ Standardized across all project documentation
