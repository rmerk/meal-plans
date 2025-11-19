#!/usr/bin/env node

/**
 * compare-screenshots.js - Compare two screenshots and generate diff image
 *
 * Usage:
 *   node compare-screenshots.js <baseline> <current> [--threshold=0.1] [--output=diff]
 *
 * Example:
 *   node compare-screenshots.js tests/screenshots/baseline/home.png tests/screenshots/current/home.png
 *   node compare-screenshots.js baseline.png current.png --threshold=0.05
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Parse command line arguments
const args = process.argv.slice(2);
const baselinePath = args.find(arg => !arg.startsWith('--') && arg.endsWith('.png'));
const currentPath = args.find((arg, i) => !arg.startsWith('--') && arg.endsWith('.png') && i > args.indexOf(baselinePath));
const thresholdArg = args.find(arg => arg.startsWith('--threshold='));
const threshold = thresholdArg ? parseFloat(thresholdArg.split('=')[1]) : 0.1;
const outputArg = args.find(arg => arg.startsWith('--output='));
const outputName = outputArg ? outputArg.split('=')[1] : 'diff';

if (!baselinePath || !currentPath) {
  console.error('❌ Error: Two image paths are required');
  console.error('Usage: node compare-screenshots.js <baseline> <current> [--threshold=0.1]');
  process.exit(1);
}

/**
 * Compare two PNG images
 */
function compareImages() {
  try {
    // Check if files exist
    if (!existsSync(baselinePath)) {
      throw new Error(`Baseline image not found: ${baselinePath}`);
    }
    if (!existsSync(currentPath)) {
      throw new Error(`Current image not found: ${currentPath}`);
    }

    // Read images
    const baselineImg = PNG.sync.read(readFileSync(baselinePath));
    const currentImg = PNG.sync.read(readFileSync(currentPath));

    // Check dimensions match
    if (baselineImg.width !== currentImg.width || baselineImg.height !== currentImg.height) {
      throw new Error(
        `Image dimensions don't match: ` +
        `baseline (${baselineImg.width}x${baselineImg.height}) vs ` +
        `current (${currentImg.width}x${currentImg.height})`
      );
    }

    const { width, height } = baselineImg;
    const diffImg = new PNG({ width, height });

    // Compare images
    const numDiffPixels = pixelmatch(
      baselineImg.data,
      currentImg.data,
      diffImg.data,
      width,
      height,
      { threshold }
    );

    // Calculate similarity percentage
    const totalPixels = width * height;
    const diffPercentage = (numDiffPixels / totalPixels) * 100;
    const similarityPercentage = 100 - diffPercentage;

    // Save diff image if there are differences
    if (numDiffPixels > 0) {
      const diffDir = resolve(dirname(currentPath), '../diffs');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
      const diffFilename = `${outputName}-${timestamp}.png`;
      const diffPath = resolve(diffDir, diffFilename);

      // Create diffs directory
      mkdirSync(diffDir, { recursive: true });

      writeFileSync(diffPath, PNG.sync.write(diffImg));

      console.log(JSON.stringify({
        match: false,
        similarity: parseFloat(similarityPercentage.toFixed(2)),
        diffPixels: numDiffPixels,
        totalPixels,
        diffImage: diffPath,
        baseline: baselinePath,
        current: currentPath
      }, null, 2));
    } else {
      console.log(JSON.stringify({
        match: true,
        similarity: 100,
        diffPixels: 0,
        totalPixels,
        baseline: baselinePath,
        current: currentPath
      }, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

compareImages();
