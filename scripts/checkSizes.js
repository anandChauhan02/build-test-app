const fs = require('fs').promises;
const path = require('path');

const checkFileSize = async (filePath, maxSize) => {
    console.log('Checking file size:', filePath);
    try {
        const stat = await fs.stat(filePath);
        const fileSize = stat.size;
        if (fileSize > maxSize) {
            console.error(`File size exceeded limit: ${filePath}`);
            process.exit(1);
        }
        console.log(`File size is within limit: ${filePath}`);
    } catch (error) {
        console.error(`Error checking file size for ${filePath}:`, error);
        process.exit(1);
    }
};

const buildPath = path.resolve(__dirname, '../build');

// Wait for the build directory to be created
const waitForBuildFiles = async () => {
    let attempt = 0;
    const maxAttempts = 30; // Adjust the maximum attempts as needed

    while (attempt < maxAttempts) {
        try {
            const files = await fs.readdir(buildPath);
            if (files.length > 0) {
                console.log('Build directory detected.');
                return;
            }
        } catch (error) {
            console.log(`Waiting for the build directory... (Attempt ${attempt + 1}/${maxAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempt++;
        }
    }

    console.error('Timed out waiting for the build directory.');
    process.exit(1);
};

const checkFileSizes = async () => {
    await waitForBuildFiles();

    const jsPath = path.join(buildPath, 'static/js');
    const cssPath = path.join(buildPath, 'static/css');

    try {
        const jsFilenames = await fs.readdir(jsPath);
        const cssFilenames = await fs.readdir(cssPath);

        if (jsFilenames.length === 0 || cssFilenames.length === 0) {
            console.error('Error: Could not find JS or CSS files in the build directory.');
            process.exit(1);
        }

        for (const jsFilename of jsFilenames) {
            await checkFileSize(path.join(jsPath, jsFilename), 300 * 1024);
        }

        for (const cssFilename of cssFilenames) {
            await checkFileSize(path.join(cssPath, cssFilename), 300 * 1024);
        }
    } catch (error) {
        console.error('Error checking file sizes:', error);
        process.exit(1);
    }
};

checkFileSizes();
