const fs = require("fs");
const path = require("path");

async function copyAssets(projectName) {
  const sourceAssetsDir = path.join(process.cwd(), "assets");
  const targetPublicDir = path.join(projectName, "public");

  // Check if the assets folder exists
  if (!fs.existsSync(sourceAssetsDir)) {
    console.log('⚠️ No assets folder found, skipping assets copy...');
    return;
  }

  // Create public folder if it doesn't exist
  if (!fs.existsSync(targetPublicDir)) {
    fs.mkdirSync(targetPublicDir, { recursive: true });
  }

  // Copy all files from the assets folder
  console.log('📦 Copying assets to public folder...');
  const files = fs.readdirSync(sourceAssetsDir);
  
  // Create an array with the names of the files to use in the component
  const imageFiles = [];
  
  files.forEach(file => {
    const sourcePath = path.join(sourceAssetsDir, file);
    const targetPath = path.join(targetPublicDir, file);
    
    if (fs.lstatSync(sourcePath).isFile() && isImageFile(file)) {
      fs.copyFileSync(sourcePath, targetPath);
      imageFiles.push(file);
      console.log(`Copied: ${file}`);
    }
  });

  return imageFiles;
}

// Auxiliary function to check if it is an image file
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

module.exports = { copyAssets }; 