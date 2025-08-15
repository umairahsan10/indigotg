# Background Music System

This document explains how the background music system works in the Indigo website.

## Features

### 🎵 Background Music
- **Location**: Only plays on the home page (`/`)
- **Audio File**: `/public/music/bg_music.mp3`
- **Loop**: Music automatically loops when it ends
- **Volume Control**: Adjustable volume slider (0-100%)
- **Progress Tracking**: Shows current playback position

### 🎬 Smart Video Detection
The system automatically detects when videos are playing and pauses the background music:

- **HTML5 Videos**: Detects `<video>` elements that are playing
- **YouTube Videos**: Detects YouTube iframes and their playback state
- **Other Audio**: Detects other `<audio>` elements that might interfere
- **Auto-Resume**: Music automatically resumes when videos stop playing

### 💾 State Persistence
- **Position Memory**: Remembers where the music was when you navigate away
- **Volume Memory**: Remembers your preferred volume setting
- **Play State**: Remembers if music was playing when you left
- **Local Storage**: All state is saved in browser's localStorage

## Components

### BackgroundMusic.tsx
Main component that handles:
- Audio playback control
- UI for play/pause, volume, and progress
- Integration with video detection system
- State persistence

### useVideoDetection.ts
Custom hook that:
- Monitors all video elements on the page
- Detects YouTube iframe states
- Provides real-time video playback information
- Can be used by other components if needed

## How It Works

1. **Home Page Only**: Music component only renders on the home page (`/`)
2. **Auto-Detect Videos**: System continuously monitors for video playback
3. **Smart Pause**: When a video starts, music automatically pauses
4. **Auto-Resume**: When videos stop, music resumes from where it left off
5. **State Save**: When navigating away, current position and state are saved
6. **State Restore**: When returning to home, music resumes from saved position

## Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Mobile Browsers**: May have restrictions on auto-play
- **Safari**: May require user interaction to start audio
- **Chrome/Firefox**: Best compatibility and feature support

## Customization

### Changing Music File
Update the `audioSrc` prop in `page.tsx`:
```tsx
<BackgroundMusic audioSrc="/music/your-new-music.mp3" />
```

### Adjusting Volume Range
Modify the volume slider in `BackgroundMusic.tsx`:
```tsx
<input
  type="range"
  min="0"        // Minimum volume
  max="1"        // Maximum volume
  step="0.1"     // Volume increments
  // ...
/>
```

### Changing UI Position
Modify the CSS classes in `BackgroundMusic.tsx`:
```tsx
<div className="fixed bottom-4 right-4 z-50 ...">
  {/* Change bottom-4 right-4 to adjust position */}
</div>
```

## Troubleshooting

### Music Not Playing
1. Check if you're on the home page (`/`)
2. Ensure the audio file exists at `/public/music/bg_music.mp3`
3. Check browser console for errors
4. Try clicking the play button manually

### Videos Not Detected
1. Ensure video elements have proper `play`/`pause` events
2. For YouTube videos, check if iframe has proper attributes
3. Verify video elements are not muted or have volume > 0

### State Not Persisting
1. Check if localStorage is enabled in your browser
2. Ensure you're navigating between pages (not just scrolling)
3. Check browser console for localStorage errors

## Future Enhancements

- **Playlist Support**: Multiple music tracks
- **Fade Effects**: Smooth transitions between music and videos
- **User Preferences**: Remember user's music preferences
- **Mobile Optimization**: Better mobile audio handling
- **Accessibility**: Screen reader support and keyboard navigation
