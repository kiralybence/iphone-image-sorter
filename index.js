const fs = require('fs');
const path = require('path');

const mainPath = process.argv[2];

if (!mainPath) {
    throw 'Path is not given.';
}

if (!path.isAbsolute(mainPath)) {
    throw 'Path is not absolute.';
}

if (!fs.existsSync(mainPath)) {
    throw 'Directory does not exist.';
}

console.log(`Finding images in: ${mainPath}`);

let files = fs.readdirSync(mainPath, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(file => path.parse(file.name));

console.log(`Found ${files.length} images.`);

files.forEach(file => {
    // Check if the filename follows iPhone naming convention
    if (/^IMG_[0-9]+$/.test(file.name)) {
        switch (file.ext) {
            case '.PNG':
                move(file, 'Screenshots');
                break;

            case '.JPG':
            case '.HEIC':
            case '.MOV':
            case '.MP4':
                move(file, 'DCIM');
                break;

            default:
                move(file, 'Downloads');
                break;
        }
    } else {
        move(file, 'Downloads');
    }
});

/**
 * Move a file to a subdirectory.
 * 
 * @param {path.ParsedPath} file The file object
 * @param {string} targetDir The target subdirectory
 */
async function move(file, targetDir) {
    let targetDirPath = path.join(mainPath, targetDir);
    
    if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath);
    }

    console.log(`Moving: ${file.base} -> ${targetDir}`);

    fs.rename(
        path.join(mainPath, file.base),
        path.join(mainPath, targetDir, file.base),
        err => { if (err) throw err; }
    );
}