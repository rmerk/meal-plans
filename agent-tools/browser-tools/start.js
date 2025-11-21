#!/usr/bin/env node

/**
 * start.js - Launch Chrome with remote debugging enabled
 *
 * Usage:
 *   node start.js [--headless] [--port=9222]
 *
 * Example:
 *   node start.js --headless
 *   node start.js --port=9223
 */

import { execSync, spawn } from 'child_process'
import { existsSync } from 'fs'
import { platform } from 'os'

// Parse command line arguments
const args = process.argv.slice(2)
const headless = args.includes('--headless')
const portArg = args.find(arg => arg.startsWith('--port='))
const port = portArg ? portArg.split('=')[1] : '9222'

/**
 * Detect Chrome executable path based on platform
 */
function getChromePath() {
  const os = platform()

  const paths = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      `${process.env.HOME}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium'
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`
    ]
  }

  const platformPaths = paths[os] || paths.linux

  for (const path of platformPaths) {
    if (existsSync(path)) {
      return path
    }
  }

  throw new Error(`Chrome executable not found. Searched: ${platformPaths.join(', ')}`)
}

/**
 * Check if Chrome is already running on the debugging port
 */
function isChromeRunning() {
  try {
    const cmd = platform() === 'win32'
      ? `netstat -ano | findstr :${port}`
      : `lsof -ti :${port}`

    execSync(cmd, { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

/**
 * Launch Chrome with remote debugging
 */
function launchChrome() {
  if (isChromeRunning()) {
    console.log(`✓ Chrome already running on port ${port}`)
    console.log(`ws://localhost:${port}`)
    return
  }

  const chromePath = getChromePath()

  const chromeArgs = [
    `--remote-debugging-port=${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--disable-sync',
    '--disable-translate',
    '--disable-extensions'
  ]

  if (headless) {
    chromeArgs.push('--headless=new')
  }

  console.log(`Launching Chrome with remote debugging on port ${port}...`)
  console.log(`Mode: ${headless ? 'headless' : 'headed'}`)

  const child = spawn(chromePath, chromeArgs, {
    detached: true,
    stdio: 'ignore'
  })

  child.unref()

  // Wait a moment for Chrome to start
  setTimeout(() => {
    console.log(`✓ Chrome launched successfully`)
    console.log(`ws://localhost:${port}`)
  }, 1000)
}

try {
  launchChrome()
} catch (error) {
  console.error('❌ Error:', error.message)
  process.exit(1)
}
