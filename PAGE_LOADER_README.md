# Page Loader System

This project implements a smooth page transition loader that provides a professional user experience when navigating between pages.

## How It Works

The page loader system consists of three main components:

### 1. Logo Component (`src/app/components/Logo.tsx`)
- A simple triangular logo that animates during page transitions
- Uses the brand color `#140A8E` (from your logo-blue.svg)
- Animates with stroke drawing and fill effects

### 2. PageTransition Component (`src/app/components/PageTransition.tsx`)
- Wraps all page content in the layout
- Intercepts navigation clicks to trigger smooth transitions
- Creates animated blocks that slide across the screen
- Shows the logo animation during transitions

### 3. CSS Styles (`src/app/globals.css`)
- Defines the visual appearance of the transition overlay
- Controls the block animations and logo positioning
- Ensures proper z-index layering

## Features

- **Smooth Block Transitions**: 20 animated blocks slide across the screen
- **Logo Animation**: Logo draws itself with stroke animation, then fills
- **Automatic Detection**: Automatically detects internal navigation links
- **Performance Optimized**: Uses GSAP for smooth animations
- **Responsive**: Works on all screen sizes

## Animation Sequence

1. **Page Exit**: 
   - Blocks slide in from left to right
   - Logo overlay appears
   - Logo path draws itself
   - Logo fills with color

2. **Page Load**: 
   - New page content loads
   - Blocks slide out from right to left
   - Page becomes interactive

## Integration

The loader is automatically integrated into your app through:
- `src/app/layout.tsx` - Wraps all pages
- `src/app/globals.css` - Provides styling
- All internal navigation links are automatically intercepted

## Customization

You can customize the loader by:
- Changing colors in the CSS variables
- Adjusting animation timing in the PageTransition component
- Modifying the logo design in the Logo component
- Changing the number of blocks (currently 20)

## Dependencies

- GSAP (already installed)
- React 19+ (already installed)
- Next.js 15+ (already installed)

## Testing

To test the loader:
1. Navigate between different pages in your app
2. Click on internal navigation links
3. The loader should appear with smooth animations
4. Each page transition should feel seamless

The loader is now fully integrated and will work automatically on all page transitions!
