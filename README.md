# WebXR AR Application - Surface Placement

A production-ready markerless augmented reality web application using WebXR Device API and Three.js for detecting real-world surfaces and placing 3D models in architectural/construction demonstration scenarios.

![WebXR AR Application](https://img.shields.io/badge/WebXR-AR-blue?style=for-the-badge&logo=webxr)
![Three.js](https://img.shields.io/badge/Three.js-0.160.0-black?style=for-the-badge&logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🌟 Features

### Core Functionality
- ✅ **Markerless AR** - No markers needed, works on any surface
- ✅ **Surface Detection** - Automatic detection of floors, tables, and walls using WebXR Hit-Test API
- ✅ **Visual Reticle** - Placement indicator showing where models will appear
- ✅ **Multiple Models** - Switch between Building, Floor Plan, and Equipment models
- ✅ **Multi-Placement** - Place unlimited model instances in your space
- ✅ **Smooth Animations** - Models animate in when placed
- ✅ **Real-time Feedback** - Status indicators and instructions throughout

### Technical Features
- 🔧 WebXR Device API for immersive AR sessions
- 🔧 Three.js for 3D rendering and scene management
- 🔧 Hit-test API for accurate surface detection
- 🔧 ES6 modules with CDN imports (no build step required)
- 🔧 Responsive mobile-first design
- 🔧 Comprehensive error handling
- 🔧 Browser compatibility detection
- 🔧 HTTPS/localhost ready

### User Experience
- 🎨 Beautiful gradient UI (Blue #667eea → Purple #764ba2)
- 🎨 Clear step-by-step instructions
- 🎨 Intuitive model selection interface
- 🎨 Status messages for user feedback
- 🎨 Mobile-optimized controls

## 📱 Browser Compatibility

### ✅ Supported (Primary)
- **Chrome for Android** 79+ (Recommended)
- **Samsung Internet** 11.2+
- **Edge for Android** 79+

### ⚠️ Requirements
- Android device with ARCore support
- Camera permissions granted
- HTTPS connection (or localhost for testing)

### ❌ Not Supported
- iOS Safari (WebXR not implemented by Apple)
- Desktop browsers (no AR capabilities)
- Older Android devices without ARCore

### Check Device Compatibility
Visit [Google's ARCore Supported Devices](https://developers.google.com/ar/devices) to verify your device supports ARCore.

## 🚀 Quick Start

### Option 1: GitHub Pages (Easiest)

1. Fork this repository
2. Go to Settings → Pages
3. Enable GitHub Pages from `main` branch
4. Visit `https://yourusername.github.io/web-ar/` on your Android device

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/web-ar.git
cd web-ar

# Serve over HTTPS (required for WebXR)
# Option A: Using Python
python3 -m http.server 8000

# Option B: Using Node.js http-server
npx http-server -p 8000

# Option C: Using PHP
php -S localhost:8000
```

Then open `https://localhost:8000` on your Android device (or use ngrok for remote access).

### Option 3: Online Hosting

Deploy to any static hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repo
- **Firebase Hosting**: `firebase deploy`
- **GitHub Pages**: Enable in repository settings

## 📖 How to Use

### Step-by-Step Guide

1. **Open the App**
   - Visit the URL on your Android Chrome browser
   - Allow camera permissions when prompted

2. **Check Compatibility**
   - The status bar shows if WebXR is supported
   - If supported, you'll see an "Enter AR" button
   - If not supported, you'll see requirements and instructions

3. **Enter AR Mode**
   - Tap the large "Enter AR Mode" button
   - The camera view will open

4. **Scan Your Environment**
   - Slowly move your device around
   - Point at floors, tables, or flat surfaces
   - A blue/purple ring (reticle) appears on detected surfaces

5. **Select a Model**
   - Three buttons appear at the bottom:
     - 🏢 **Building** - 3D architectural structure
     - 📐 **Floor Plan** - Flat layout with grid
     - ⚙️ **Equipment** - Cylindrical machinery
   - Tap to switch between models

6. **Place Models**
   - Move the reticle to desired location
   - Tap anywhere on the screen
   - Model appears and animates in
   - Place as many as you want!

7. **Exit AR**
   - Tap the back button or home button
   - Session ends automatically

## 🏗️ Project Structure

```
web-ar/
├── index.html          # Main HTML with UI structure
├── app.js             # WebXR logic and Three.js implementation
├── style.css          # Complete styling with gradient theme
├── models/            # Directory for 3D models
│   ├── README.md     # Guide for adding custom models
│   └── .gitkeep      # Keep directory in git
├── README.md          # This file
├── DEPLOYMENT.md      # Deployment guide for various platforms
└── .gitignore        # Git ignore patterns
```

## 🎨 Customization

### Change Theme Colors

Edit `style.css` to change the gradient colors:

```css
/* Find these color definitions and change them */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* To your preferred colors, for example: */
background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
```

### Add Custom 3D Models

See `models/README.md` for detailed instructions. Quick overview:

1. Export models as GLB format
2. Place in `models/` directory
3. Update `loadModels()` function in `app.js`:

```javascript
const loader = new GLTFLoader();
loader.load('./models/your-model.glb', (gltf) => {
    models.yourmodel = gltf.scene;
});
```

### Modify Model Scale

Change scale in `app.js`:

```javascript
// Current default scale
models.building.scale.set(0.1, 0.1, 0.1);

// Adjust as needed (larger = bigger model)
models.building.scale.set(0.2, 0.2, 0.2);
```

### Add More Models

1. Add button in `index.html`:
```html
<button class="model-btn" data-model="newmodel">
    <span class="model-icon">🎯</span>
    <span class="model-name">New Model</span>
</button>
```

2. Create model in `app.js` `loadModels()` function
3. Update `modelNames` object in model selection handler

## 🔧 Technical Details

### WebXR Session Configuration

```javascript
const session = await navigator.xr.requestSession('immersive-ar', {
    requiredFeatures: ['hit-test'],      // Surface detection
    optionalFeatures: ['dom-overlay'],   // UI overlay
    domOverlay: { root: document.body }  // Root element
});
```

### Hit-Test Implementation

The app uses WebXR's hit-test API to detect real-world surfaces:

1. Request hit-test source when session starts
2. Perform hit-test each frame
3. Update reticle position based on detected surfaces
4. Place models at reticle location on user tap

### Coordinate System

- Uses `local-floor` reference space
- Origin is at user's position when entering AR
- Y-axis points up, X-axis right, Z-axis toward user
- Models maintain world-locked position after placement

### Performance Optimization

- Efficient render loop (only renders when in XR session)
- Model cloning for multiple instances
- Minimal DOM manipulation during AR session
- Optimized geometry (low-poly placeholder models)

## 🐛 Troubleshooting

### "WebXR Not Supported" Message

**Solutions:**
- Ensure you're using Chrome for Android 79+
- Check device is ARCore compatible
- Update Chrome to latest version
- Try Samsung Internet as alternative

### Camera Permission Denied

**Solutions:**
- Go to Chrome Settings → Site Settings → Camera
- Find your site and allow camera access
- Restart Chrome after changing permissions

### "Failed to start AR session"

**Solutions:**
- Make sure connection is HTTPS (not HTTP)
- Localhost is okay for testing
- Check camera isn't being used by another app
- Restart device if issue persists

### Reticle Not Appearing

**Solutions:**
- Move device more to scan environment
- Point at well-lit, textured surfaces
- Avoid reflective or transparent surfaces
- Avoid very dark or featureless areas

### Models Too Big/Small

**Solutions:**
- Adjust scale in `app.js` `loadModels()` function
- Modify the `scale.set()` values
- Typically 0.05 to 0.3 works well for most models

### Performance Issues

**Solutions:**
- Use lower-poly models
- Reduce number of placed objects
- Close other apps
- Ensure good lighting
- Clear browser cache

## 🌐 Deployment

### GitHub Pages

```bash
git add .
git commit -m "Add WebXR AR application"
git push origin main
```

Enable Pages in Settings → Pages → Source: main branch

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or drag-and-drop folder to [netlify.com/drop](https://app.netlify.com/drop)

### Custom Domain

1. Update domain DNS settings to point to hosting
2. Add HTTPS certificate (automatic on most platforms)
3. WebXR requires HTTPS to function

See `DEPLOYMENT.md` for detailed deployment instructions.

## 📚 Architecture

### Component Overview

```
┌─────────────────────────────────────┐
│         User Interface (HTML)       │
│  - Status Bar                       │
│  - Instructions                     │
│  - AR Button                        │
│  - Model Selector                   │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│     Application Logic (app.js)      │
│  - WebXR Session Management         │
│  - Hit-Test Processing              │
│  - Model Management                 │
│  - Event Handling                   │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│        Three.js Rendering           │
│  - Scene Management                 │
│  - Camera Control                   │
│  - Lighting                         │
│  - Model Rendering                  │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         WebXR Device API            │
│  - AR Session                       │
│  - Hit Testing                      │
│  - Reference Space                  │
│  - Input Events                     │
└─────────────────────────────────────┘
```

### Data Flow

1. **Initialization**: Check WebXR support → Setup Scene → Load Models
2. **Session Start**: Request XR Session → Get Reference Space → Setup Hit-Test
3. **Render Loop**: Perform Hit-Test → Update Reticle → Render Scene
4. **Interaction**: User Taps → Clone Model → Place at Reticle Position
5. **Session End**: Cleanup → Reset UI → Back to Home

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test on real Android devices
- Update documentation as needed
- Keep dependencies minimal

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **WebXR Device API** - W3C standard for AR/VR on the web
- **ARCore** - Google's AR platform for Android
- Inspiration from WebXR samples and demos

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/web-ar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/web-ar/discussions)
- **WebXR**: [WebXR Device API Spec](https://www.w3.org/TR/webxr/)
- **Three.js**: [Three.js Documentation](https://threejs.org/docs/)

## 🔗 Useful Links

- [WebXR Explainer](https://github.com/immersive-web/webxr/blob/master/explainer.md)
- [WebXR Samples](https://immersive-web.github.io/webxr-samples/)
- [Three.js Examples](https://threejs.org/examples/)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [Can I use WebXR?](https://caniuse.com/webxr)

## 📈 Roadmap

Future enhancements:
- [ ] Model rotation controls
- [ ] Model scale adjustment UI
- [ ] Delete placed models
- [ ] Save/load AR scenes
- [ ] Screenshot capture
- [ ] Real-time shadows
- [ ] Lighting estimation
- [ ] Anchor persistence
- [ ] Multi-user collaboration
- [ ] Voice commands

## 🎯 Use Cases

This application is ideal for:

- **Architecture**: Visualize buildings on construction sites
- **Real Estate**: Show floor plans in actual spaces
- **Construction**: Preview equipment placement
- **Education**: Interactive 3D learning
- **Trade Shows**: Product demonstrations
- **Museums**: Virtual exhibits
- **Interior Design**: Furniture placement
- **Retail**: Product visualization

---

**Built with ❤️ using WebXR and Three.js**

Made for architecture and construction demonstrations | Ready for production deployment
