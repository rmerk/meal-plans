#!/usr/bin/env node

/**
 * extract-colors.js - Extract CSS custom properties and theme colors from page
 *
 * Usage:
 *   node extract-colors.js [--port=9222] [--selector=:root]
 *
 * Example:
 *   node extract-colors.js
 *   node extract-colors.js --selector=body
 */

import puppeteer from 'puppeteer-core';

// Parse command line arguments
const args = process.argv.slice(2);
const portArg = args.find(arg => arg.startsWith('--port='));
const port = portArg ? portArg.split('=')[1] : '9222';
const selectorArg = args.find(arg => arg.startsWith('--selector='));
const selector = selectorArg ? selectorArg.split('=')[1] : ':root';

/**
 * Extract theme colors and CSS custom properties
 */
async function extractColors() {
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

    // Extract colors from the page
    const colors = await page.evaluate((sel) => {
      const element = sel === ':root'
        ? document.documentElement
        : document.querySelector(sel);

      if (!element) {
        throw new Error(`Element not found: ${sel}`);
      }

      const styles = getComputedStyle(element);
      const cssVars = {};
      const computedColors = {};

      // Extract CSS custom properties (--*)
      for (let i = 0; i < styles.length; i++) {
        const prop = styles[i];
        if (prop.startsWith('--')) {
          const value = styles.getPropertyValue(prop).trim();
          cssVars[prop] = value;
        }
      }

      // Extract commonly used color properties
      const colorProps = [
        'color',
        'background-color',
        'border-color',
        'accent-color'
      ];

      colorProps.forEach(prop => {
        const value = styles.getPropertyValue(prop);
        if (value && value !== 'rgba(0, 0, 0, 0)') {
          computedColors[prop] = value;
        }
      });

      return {
        cssVariables: cssVars,
        computedColors: computedColors,
        selector: sel
      };
    }, selector);

    // Output as JSON
    console.log(JSON.stringify(colors, null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.disconnect();
    }
  }
}

extractColors();
