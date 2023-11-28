const fs = require('fs');
const path = require('path');

const checkFileSize = (filePath, maxSize) => {
    try {
        const fileSize = fs.statSync(filePath).size;
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

const checkFileSizes = () => {
    const buildPath = path.resolve(__dirname, '../build/static');

    // Get the filenames dynamically
    const jsPath = path.join(buildPath, 'js');
    const cssPath = path.join(buildPath, 'css');

    try {
        const jsFilenames = fs.readdirSync(jsPath).filter((file) => file.endsWith('.js'));
        const cssFilenames = fs.readdirSync(cssPath).filter((file) => file.endsWith('.css'));

        if (jsFilenames.length === 0 || cssFilenames.length === 0) {
            console.error('Error: Could not find JS or CSS files in the build directory.');
            process.exit(1);
        }

        jsFilenames.forEach((jsFilename) => {
            checkFileSize(path.join(jsPath, jsFilename), 300 * 1024); // Adjust the size limit accordingly
        });

        cssFilenames.forEach((cssFilename) => {
            checkFileSize(path.join(cssPath, cssFilename), 300 * 1024); // Adjust the size limit accordingly
        });
    } catch (error) {
        console.error('Error checking file sizes:', error);
        process.exit(1);
    }
};

checkFileSizes();
