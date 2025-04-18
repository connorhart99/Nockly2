/*
  This script generates placeholder images from Unsplash for development use.
  Run this script with Node.js to download beautiful images to the public directory.
  
  Usage: node scripts/generate-placeholders.js
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

// Ensure the public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// List of images to download from Unsplash
const images = [
  {
    filename: 'hero-bg.jpg',
    url: 'https://source.unsplash.com/random/1920x1080/?website,design',
    description: 'Hero background image'
  },
  {
    filename: 'portfolio-1.jpg',
    url: 'https://source.unsplash.com/random/800x600/?website',
    description: 'Portfolio image 1'
  },
  {
    filename: 'portfolio-2.jpg',
    url: 'https://source.unsplash.com/random/800x600/?design',
    description: 'Portfolio image 2'
  },
  {
    filename: 'portfolio-3.jpg',
    url: 'https://source.unsplash.com/random/800x600/?development',
    description: 'Portfolio image 3'
  },
];

console.log('🖼️  Downloading images from Unsplash...');
console.log('📝 Note: Images from Unsplash are free to use for commercial and non-commercial purposes');
console.log('🔗 Attribution not required, but appreciated: https://unsplash.com/');

// Download each image
images.forEach(image => {
  const filePath = path.join(publicDir, image.filename);
  
  console.log(`⬇️  Downloading ${image.description} (${image.filename})...`);
  
  https.get(image.url, (response) => {
    // Handle redirects from Unsplash
    if (response.statusCode === 302 || response.statusCode === 301) {
      const redirectUrl = response.headers.location;
      console.log(`   ↪️  Following redirect to ${redirectUrl}`);
      
      https.get(redirectUrl, (redirectResponse) => {
        if (redirectResponse.statusCode !== 200) {
          console.error(`❌ Failed to download ${image.filename}: Status code ${redirectResponse.statusCode}`);
          return;
        }
        
        const fileStream = fs.createWriteStream(filePath);
        redirectResponse.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded ${image.filename} successfully`);
        });
      }).on('error', (err) => {
        console.error(`❌ Error downloading ${image.filename} after redirect: ${err.message}`);
      });
      
    } else if (response.statusCode === 200) {
      // Direct download without redirect
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded ${image.filename} successfully`);
      });
    } else {
      console.error(`❌ Failed to download ${image.filename}: Status code ${response.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`❌ Error downloading ${image.filename}: ${err.message}`);
  });
}); 