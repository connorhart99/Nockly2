# Nockly Website

A TikTok-style swipeable canvas website for a web development agency.

## Features

- Fullscreen canvases that adapt to any screen size
- Smooth navigation between canvases
- Multiple input methods:
  - Arrow keys
  - Touchpad dragging
  - Mobile touch
  - Mouse wheel scrolling
- Snap-to-canvas after dragging
- Responsive design for all devices

## Setup

### Quick Setup (Recommended)

Run the all-in-one setup script:
```bash
npm run setup
```

This will automatically:
1. Install all dependencies
2. Download beautiful images from Unsplash
3. Start the development server

### Manual Setup

1. Install dependencies:
```bash
npm install
```

2. **Important**: Add the following images to the `/public` directory:
   - `hero-bg.jpg` - Background for hero section
   - `portfolio-1.jpg` - Portfolio example 1
   - `portfolio-2.jpg` - Portfolio example 2
   - `portfolio-3.jpg` - Portfolio example 3

   **Quick Solution**: Run the following command to automatically download beautiful images from Unsplash:
   ```bash
   npm run placeholders
   ```

   Or you can use your own images from sources like:
   - [Unsplash](https://unsplash.com/) (Free, high-quality stock photos)
   - [Pexels](https://www.pexels.com/)
   - [Pixabay](https://pixabay.com/)

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start the production server:
```bash
npm start
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Project Structure

- `/app` - Next.js app directory
  - `/components` - React components
  - `/styles` - Additional CSS styles
- `/public` - Static assets like images
- `/scripts` - Utility scripts

## Image Credits

The placeholder images are downloaded from [Unsplash](https://unsplash.com/), a platform for free-to-use high-quality stock photos. While attribution is not required by Unsplash's license, we appreciate their service.

## Troubleshooting

### Missing Images
If you see placeholders instead of images, make sure you've added the required image files to the `/public` directory as mentioned in the setup instructions.

You can quickly download beautiful images from Unsplash with:
```bash
npm run placeholders
```

### Extra Attributes Warning
If you see warnings about extra attributes from the server, this is a known hydration issue with Next.js. We've added `suppressHydrationWarning` to handle this gracefully.

## License

Copyright © 2025 Nockly. All rights reserved. 