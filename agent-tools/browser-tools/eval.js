#!/usr/bin/env node

/**
 * eval.js - Execute JavaScript in page context
 *
 * Usage:
 *   node eval.js <javascript> [--port=9222]
 *
 * Example:
 *   node eval.js "document.title"
 *   node eval.js "document.querySelector('h1').textContent"
 *   node eval.js "getComputedStyle(document.body).backgroundColor"
 */

import puppeteer from 'puppeteer-core';

// Parse command line arguments
const args = process.argv.slice(2);
const portArg = args.find(arg => arg.startsWith('--port='));
const port = portArg ? portArg.split('=')[1] : '9222';
const code = args.find(arg => !arg.startsWith('--'));

if (!code) {
  console.error('❌ Error: JavaScript code is required');
  console.error('Usage: node eval.js <javascript> [--port=9222]');
  process.exit(1);
}

/**
 * Execute JavaScript in page context
 */
async function evaluate() {
  let browser;

  try {
    // Connect to existing Chrome instance
    browser = await puppeteer.connect({
      browserURL: `http://localhost:${port}`
    });

    // Get the active page
    const pages = await browser.pages();
    if (pages.length === 0) {
      throw new Error('No pages open. Navigate to a URL first using nav.js');
    }

    const page = pages[0];

    // Execute the code in page context
    const result = await page.evaluate((code) => {
      // eslint-disable-next-line no-eval
      return eval(code);
    }, code);

    // Output result as JSON
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.disconnect();
    }
  }
}

evaluate();
