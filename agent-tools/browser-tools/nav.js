#!/usr/bin/env node

/**
 * nav.js - Navigate to a URL in the browser
 *
 * Usage:
 *   node nav.js <url> [--port=9222] [--new-tab]
 *
 * Example:
 *   node nav.js http://localhost:4000
 *   node nav.js https://example.com --new-tab
 */

import puppeteer from 'puppeteer-core'

// Parse command line arguments
const args = process.argv.slice(2)
const url = args.find(arg => !arg.startsWith('--'))
const portArg = args.find(arg => arg.startsWith('--port='))
const port = portArg ? portArg.split('=')[1] : '9222'
const newTab = args.includes('--new-tab')

if (!url) {
  console.error('❌ Error: URL is required')
  console.error('Usage: node nav.js <url> [--port=9222] [--new-tab]')
  process.exit(1)
}

/**
 * Navigate to URL using Puppeteer
 */
async function navigate() {
  let browser

  try {
    // Connect to existing Chrome instance
    browser = await puppeteer.connect({
      browserURL: `http://localhost:${port}`,
      defaultViewport: { width: 1920, height: 1080 }
    })

    let page

    if (newTab) {
      // Create new page/tab
      page = await browser.newPage()
    } else {
      // Get existing pages
      const pages = await browser.pages()
      page = pages.length > 0 ? pages[0] : await browser.newPage()
    }

    console.log(`Navigating to: ${url}`)

    // Navigate with timeout
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    })

    console.log(`✓ Successfully navigated to ${url}`)
    console.log(`Page title: ${await page.title()}`)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    if (browser) {
      await browser.disconnect()
    }
  }
}

navigate()
