// scripts/checkSizes.js
const fs = require('fs').promises; // Use promises version of fs
const path = require('path');

const checkFileSize = async (filePath, maxSize) => {
    console.log("check--01");
    try {
        const stats = await fs.stat(filePath);
        const fileSize = stats.size;

        if (fileSize > maxSize) {
            return `File size exceeded limit: ${filePath}`;
        }
        return `File size is within limit: ${filePath}`;
    } catch (error) {
        return `Error checking file size for ${filePath}: ${error.message}`;
    }
};

const checkFileSizes = async (buildPath) => {
    console.log("check--02");

    const jsPath = path.join(buildPath, 'js');
    const cssPath = path.join(buildPath, 'css');

    const messages = [];

    try {
        const jsFilenames = await fs.readdir(jsPath);
        const cssFilenames = await fs.readdir(cssPath);

        if (jsFilenames.length === 0 || cssFilenames.length === 0) {
            messages.push('Error: Could not find JS or CSS files in the build directory.');
        } else {
            for (const jsFilename of jsFilenames) {
                messages.push(await checkFileSize(path.join(jsPath, jsFilename), 300 * 1024));
            }

            for (const cssFilename of cssFilenames) {
                messages.push(await checkFileSize(path.join(cssPath, cssFilename), 300 * 1024));
            }
        }
    } catch (error) {
        messages.push(`Error checking file sizes: ${error.message}`);
    }

    return messages;
};

module.exports = checkFileSizes;
