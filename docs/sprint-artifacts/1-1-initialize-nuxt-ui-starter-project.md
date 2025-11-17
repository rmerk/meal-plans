# Story 1.1: Initialize Nuxt UI Starter Project

Status: review

## Story

As a developer,
I want to initialize the project using the official Nuxt UI starter template,
So that I have a production-ready Nuxt 4 foundation with all core modules pre-configured.

## Acceptance Criteria

1. **Given** I have Node.js 24+ (LTS) installed and pnpm available
   **When** I run `pnpm create nuxt@latest meal-plans` and select the "UI" template
   **Then** the project initializes with Nuxt 4, @nuxt/ui v4, Tailwind CSS v4, TypeScript, and git repository

2. **And** I can run `pnpm install` to install dependencies

3. **And** I can run `pnpm dev` and the dev server starts successfully at http://localhost:3000

4. **And** the default Nuxt UI starter page renders without errors

## Tasks / Subtasks

- [x] Task 1: Initialize project with Nuxt UI starter template (AC: #1)
  - [x] Verify Node.js 24+ (LTS) installed: `node --version`
  - [x] Verify pnpm installed or install globally: `npm install -g pnpm`
  - [x] Run `pnpm create nuxt@latest meal-plans`
  - [x] When prompted, select "UI" template
  - [x] Confirm project directory created with expected structure

- [x] Task 2: Install project dependencies (AC: #2)
  - [x] Navigate to project directory: `cd meal-plans`
  - [x] Run `pnpm install` to install base dependencies
  - [x] Verify all dependencies installed successfully (check for pnpm-lock.yaml)

- [x] Task 3: Install additional required modules (AC: #1)
  - [x] Run `pnpm add @nuxt/content @vite-pwa/nuxt pinia @pinia/nuxt @vueuse/nuxt nuxt-charts chart.js @nuxt/image`
  - [x] Run `pnpm add -D oxlint` (installed oxlint 1.28.0 - correct package name)
  - [x] Configure .oxlintrc.json with basic rules
  - [x] Add `lint:oxc` script to package.json
  - [x] Verify additional modules added to package.json

- [x] Task 4: Start development server and verify (AC: #3, #4)
  - [x] Run `pnpm dev`
  - [x] Verify server starts at http://localhost:3000
  - [x] Open browser and confirm default Nuxt UI starter page renders
  - [x] Check console for errors (should be none)
  - [x] Verify Nuxt UI v4 components are available

- [x] Task 5: Commit initial scaffold (AC: #1)
  - [x] Verify git repository initialized
  - [x] Stage all files: `git add .`
  - [x] Create initial commit: `git commit -m "Initialize Nuxt UI starter project with pnpm and additional modules"`
  - [x] Push to remote if repository exists

## Dev Notes

### Project Structure Notes

After initialization, the project will have this structure:

```
meal-plans/
├── .nuxt/                     # Auto-generated (gitignored)
├── .gitignore                 # Preconfigured
├── app.vue                    # Root component
├── app.config.ts              # Nuxt UI theme config
├── nuxt.config.ts             # Basic config with @nuxt/ui
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
└── README.md                  # Starter docs
```

### Architecture Patterns and Constraints

**Package Manager:** pnpm (faster, more efficient, stricter dependency resolution)

**Node Version:** Node.js 24+ (LTS - Iron) for optimal performance and long-term support

**Nuxt UI Starter Provides:**
- Nuxt 4 framework (Vue 3 Composition API, SSG support, auto-imports)
- @nuxt/ui v4 (100+ accessible components)
- Tailwind CSS v4 (utility-first styling with @theme directive)
- TypeScript (type safety)
- @nuxt/icon (200,000+ Iconify icons)
- @nuxt/color-mode (dark mode support)
- @nuxt/fonts (font optimization)

**Additional Modules to Install:**
- `@nuxt/content` - Markdown-based CMS for meal plan data (CRITICAL requirement)
- `@vite-pwa/nuxt` - PWA capabilities (offline-first, service worker, manifest)
- `pinia` + `@pinia/nuxt` - State management for shopping lists, analytics, settings
- `@vueuse/nuxt` - Composables library (useLocalStorage, useSwipe, useVibrate)
- `nuxt-charts` + `chart.js` - Chart visualizations for nutrition/analytics
- `@nuxt/image` - Image optimization
- `oxc` + `@oxc/eslint-plugin` - Fast Rust-based linting (dev dependency)

### Testing Standards Summary

**Prerequisites:**
- Node.js 24+ (LTS) installed
- pnpm installed globally (`npm install -g pnpm`)

**Verification Steps:**
1. Server starts without errors using `pnpm dev`
2. Default page renders in browser
3. No console errors or warnings
4. Git repository initialized correctly
5. All dependencies listed in package.json
6. pnpm-lock.yaml file created (not package-lock.json)
7. Nuxt UI v4 components accessible

**Success Criteria:**
- Development server accessible at localhost:3000
- Default Nuxt UI welcome page displays
- No TypeScript or build errors
- pnpm workspace properly configured

### References

- [Source: docs/architecture.md#Project-Initialization] - Command breakdown and rationale
- [Source: docs/architecture.md#Starter-Template-Decision] - Why Nuxt UI starter was chosen
- [Source: docs/architecture.md#Modules-to-Add-After-Initialization] - Complete module list
- [Source: docs/epics.md#Story-1.1] - Full acceptance criteria and technical notes

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-1-initialize-nuxt-ui-starter-project.context.xml

### Agent Model Used

claude-sonnet-4-5-20250929

### Debug Log References

**Node.js Version:** Used Node.js v24.2.0 (LTS - Iron) via nvm for optimal Nuxt 4 compatibility

**Installation Approach:** Used `npm create nuxt@latest nuxt-temp -- -t ui --packageManager pnpm --gitInit false` to create Nuxt UI starter in temp directory, then copied files to current directory to coexist with brownfield vanilla JS project files

**OXC Linter:** Installed oxlint 1.28.0 (correct package name). Created .oxlintrc.json configuration with basic rules (no-debugger: error, no-console: warn, eqeqeq: error). Added `pnpm run lint:oxc` script. Note: oxlint is complementary to ESLint - both can coexist.

### Completion Notes List

✅ **Successfully initialized Nuxt 4.2.1 project with @nuxt/ui v4.1.0** using official UI starter template

✅ **All required modules installed:**
- Production: @nuxt/content (3.8.2), @vite-pwa/nuxt (1.0.7), pinia (3.0.4), @pinia/nuxt (0.11.3), @vueuse/nuxt (14.0.0), nuxt-charts (1.0.2), chart.js (4.5.1), @nuxt/image (2.0.0)
- Dev: @nuxt/eslint (1.10.0), eslint (9.39.1), typescript (5.9.3), vue-tsc (3.1.3), oxlint (1.28.0)
- Icon collections: @iconify-json/lucide, @iconify-json/simple-icons

✅ **Dev server verified** successfully running at http://localhost:3000 with Nuxt 4.2.1, Nitro 2.12.9, Vite 7.2.1, Vue 3.5.23

✅ **pnpm-lock.yaml created** with 1595 packages (827 base + 602 additional + 166 transitive)

✅ **Nuxt project structure established:**
- app/ directory with app.vue, app.config.ts, assets/, components/, pages/
- nuxt.config.ts with @nuxt/ui pre-configured
- TypeScript support with tsconfig.json
- ESLint configuration with eslint.config.mjs
- GitHub Actions CI workflow (.github/workflows/ci.yml)

✅ **Brownfield migration approach:** Nuxt files coexist with existing vanilla JS PWA files (index.html, shopping-helper.html, etc.) which will be migrated incrementally in subsequent stories

✅ **Initial commit created:** Git commit 995f30e with comprehensive description

### File List

**New Nuxt Files:**
- app/app.config.ts
- app/app.vue
- app/assets/css/main.css
- app/components/AppLogo.vue
- app/components/TemplateMenu.vue
- app/pages/index.vue
- nuxt.config.ts
- tsconfig.json
- eslint.config.mjs
- pnpm-lock.yaml
- pnpm-workspace.yaml
- .npmrc
- .editorconfig
- .github/workflows/ci.yml
- public/favicon.ico

**Modified Files:**
- package.json (replaced vanilla project package.json with Nuxt dependencies, added lint:oxc script)
- .gitignore (merged with Nuxt ignores)

**Configuration Files:**
- .oxlintrc.json (oxlint configuration with basic rules)
