#!/usr/bin/env node

/**
 * screenshot.js - Capture screenshots of the browser viewport
 *
 * Usage:
 *   node screenshot.js [--output=name] [--port=9222] [--fullpage] [--width=1920] [--height=1080]
 *
 * Example:
 *   node screenshot.js --output=homepage
 *   node screenshot.js --output=mobile --width=375 --height=667
 *   node screenshot.js --fullpage
 */

import puppeteer from 'puppeteer-core'
import { resolve, dirname } from 'path'
import { mkdirSync } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Parse command line arguments
const args = process.argv.slice(2)
const portArg = args.find(arg => arg.startsWith('--port='))
const port = portArg ? portArg.split('=')[1] : '9222'
const outputArg = args.find(arg => arg.startsWith('--output='))
const outputName = outputArg ? outputArg.split('=')[1] : 'screenshot'
const fullpage = args.includes('--fullpage')
const widthArg = args.find(arg => arg.startsWith('--width='))
const width = widthArg ? parseInt(widthArg.split('=')[1]) : 1920
const heightArg = args.find(arg => arg.startsWith('--height='))
const height = heightArg ? parseInt(heightArg.split('=')[1]) : 1080

/**
 * Capture screenshot
 */
async function screenshot() {
  let browser

  try {
    // Connect to existing Chrome instance
    browser = await puppeteer.connect({
      browserURL: `http://localhost:${port}`
    })

    // Get the active page
    const pages = await browser.pages()
    if (pages.length === 0) {
      throw new Error('No pages open. Navigate to a URL first using nav.js')
    }

    const page = pages[0]

    // Set viewport size
    await page.setViewport({ width, height })

    // Create output directory
    const outputDir = resolve(__dirname, '../../tests/screenshots/current')
    mkdirSync(outputDir, { recursive: true })

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    const filename = `${outputName}-${timestamp}.png`
    const outputPath = resolve(outputDir, filename)

    // Take screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: fullpage
    })

    console.log(`✓ Screenshot saved: ${outputPath}`)
    console.log(`Viewport: ${width}x${height}`)
    console.log(`Full page: ${fullpage}`)

    // Return the path for agent use
    return outputPath
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    if (browser) {
      await browser.disconnect()
    }
  }
}

screenshot()
