# New Page Loader System - Next.js App Router Implementation

## Overview

This project now uses a **Next.js App Router-based loading system** that provides smooth, reliable page loading with real resource detection. The system ensures pages are fully functional before being shown to users.

## How It Works

### The Loading Flow

```
1. User navigates to page
   ↓
2. Triangle animation starts (immediate, smooth)
   ↓
3. Triangle completes → Loading bar appears
   ↓
4. Real resource loading happens (images, GSAP, 3D components)
   ↓
5. Loading completes → Blocks transition starts
   ↓
6. Blocks reveal the fully loaded page
```

### Key Components

#### 1. **TriangleLoader** (`src/app/components/TriangleLoader.tsx`)
- Shows immediately when page starts loading
- Smooth triangle drawing animation (800ms)
- Independent of resource loading (always smooth)

#### 2. **LoadingBar** (`src/app/components/LoadingBar.tsx`)
- Appears after triangle animation completes
- Shows **real progress** based on actual resource loading
- Displays current loading phase (images, animations, 3D components)

#### 3. **BlocksTransition** (`src/app/components/BlocksTransition.tsx`)
- Final reveal animation
- 20 white blocks slide out to reveal the page
- Only happens when everything is truly ready

#### 4. **PageLoader** (`src/app/components/PageLoader.tsx`)
- Orchestrates the entire loading sequence
- Manages phase transitions
- Shows page content only when loading is complete

#### 5. **useResourceLoader** (`src/app/hooks/useResourceLoader.ts`)
- **Actually detects** when resources are ready
- Waits for images, GSAP components, 3D components
- Provides real progress updates

## Technical Implementation

### Resource Detection

The system actually waits for:

```typescript
// Phase 1: Images (40%)
await waitForImages();

// Phase 2: GSAP Components (70%)
await waitForGSAPComponents();

// Phase 3: 3D Components (90%)
await waitFor3DComponents();

// Phase 4: Final Preparation (100%)
await waitForFinalPreparation();
```

### Next.js Integration

- **`loading.tsx`**: Shows triangle loader for route changes
- **Suspense boundaries**: Can be added for heavy components
- **App Router**: Leverages Next.js 15+ features

## Benefits

✅ **Immediate visual feedback** (triangle animation)  
✅ **Real resource loading** (not fake progress)  
✅ **Pages work when shown** (no broken animations)  
✅ **Smooth user experience** (professional feel)  
✅ **Next.js native** (better performance)  
✅ **Easy to maintain** (clean architecture)  

## Usage

### Automatic Loading

The loader is automatically applied to all pages through `src/app/layout.tsx`:

```tsx
<PageLoader>
  <main id="page-content">
    {children}
  </main>
</PageLoader>
```

### Custom Loading States

For specific pages, you can add `loading.tsx` files:

```tsx
// app/who-we-are/loading.tsx
export default function Loading() {
  return <TriangleLoader />;
}
```

## Customization

### Changing Animation Timing

```typescript
// In PageLoader.tsx
const triangleTimer = setTimeout(() => {
  setPhase('loading');
}, 800); // Adjust triangle duration
```

### Modifying Resource Detection

```typescript
// In useResourceLoader.ts
const waitForCustomComponent = (): Promise<void> => {
  return new Promise((resolve) => {
    // Add your custom detection logic
  });
};
```

### Styling

CSS classes are in `src/app/globals.css`:
- `.logo-container` - Logo sizing and positioning
- `.progress-bar` - Loading bar appearance
- `.progress-fill` - Progress bar fill animation

## Troubleshooting

### Common Issues

1. **Triangle not animating**: Check GSAP import and Logo component
2. **Loading stuck**: Verify resource detection logic
3. **Blocks not revealing**: Check GSAP timeline completion

### Debug Mode

Enable console logging in `useResourceLoader.ts`:

```typescript
console.log('Loading phase:', message, progress);
```

## Migration from Old System

### What Changed

- ❌ **Removed**: Complex link interception
- ❌ **Removed**: Fake loading simulation  
- ❌ **Removed**: Complex exclusion logic
- ✅ **Added**: Real resource detection
- ✅ **Added**: Next.js integration
- ✅ **Added**: Clean component architecture

### What Stayed

- ✅ Triangle logo animation
- ✅ Block transition effects
- ✅ GSAP integration
- ✅ Visual polish and animations

## Performance

- **Triangle animation**: Immediate, smooth (800ms)
- **Resource loading**: Real-time detection
- **Blocks transition**: 600ms reveal animation
- **Total loading time**: Varies based on actual resources

## Future Enhancements

- **Suspense boundaries** for heavy components
- **Streaming SSR** integration
- **Custom loading states** per route
- **Performance metrics** tracking

---

The new system provides a **professional, reliable loading experience** that ensures your pages work perfectly when shown to users, while maintaining the smooth visual animations you want.
