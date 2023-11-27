const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
    const jsFilename = fs.readdirSync(buildPath + '/js').find((file) => file.endsWith('.js'));
    const cssFilename = fs.readdirSync(buildPath + '/css').find((file) => file.endsWith('.css'));

    if (!jsFilename || !cssFilename) {
        console.error('Error: Could not find JS or CSS files in the build directory.');
        process.exit(1);
    }

    try {
        checkFileSize(path.join(buildPath, 'js', jsFilename), 300 * 1024); // Adjust the size limit accordingly
        checkFileSize(path.join(buildPath, 'css', cssFilename), 300 * 1024); // Adjust the size limit accordingly
    } catch (error) {
        console.error('Error checking file sizes:', error);
        process.exit(1);
    }
};

checkFileSizes();
