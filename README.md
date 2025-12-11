# Simple Web AR Application

A simple marker-based Augmented Reality web application built with AR.js and A-Frame. This application allows users to see 3D objects overlaid on the real world through their device's camera when pointing at a Hiro marker.

## Features

- 📱 **Mobile-Friendly**: Works on both desktop and mobile browsers
- 🎯 **Marker-Based AR**: Uses the standard Hiro marker for AR tracking
- 🎨 **Animated 3D Objects**: Displays rotating and animated 3D shapes
- ⚡ **Fast Loading**: Lightweight and optimized for quick loading
- 🔧 **No Installation Required**: Runs directly in the web browser

## Technologies Used

- **AR.js**: Efficient Augmented Reality library for the web
- **A-Frame**: Web framework for building 3D/AR/VR experiences
- **HTML5/CSS3/JavaScript**: Core web technologies

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A device with a camera (smartphone, tablet, or webcam)
- A printed or displayed Hiro marker

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd web-ar
   ```

2. Serve the files using a local web server. You can use any of these methods:

   **Using Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Using the Application

1. **Get the Hiro Marker**:
   - Download it from: https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png
   - Print it on paper or display it on another screen

2. **Allow Camera Access**:
   - When prompted, grant camera permissions to the browser

3. **Point Camera at Marker**:
   - Point your device's camera at the Hiro marker
   - You should see 3D objects appear on top of the marker

## Project Structure

```
web-ar/
├── index.html      # Main HTML file with AR scene
├── style.css       # Styling and UI elements
├── app.js          # JavaScript functionality
└── README.md       # Documentation
```

## AR Objects Included

The application displays the following 3D objects when the Hiro marker is detected:

- 🔷 **Rotating Box**: A cyan-colored box that rotates continuously
- 🔴 **Bouncing Sphere**: A red sphere that bounces up and down
- 🟡 **Spinning Cylinder**: A yellow cylinder that spins
- 💬 **Text**: "Hello AR!" text that pulses
- 🟣 **Rotating Torus**: A purple torus that rotates

## Customization

### Adding New Objects

Edit `index.html` and add new A-Frame entities inside the `<a-marker>` tag:

```html
<a-box position="0 0 0" color="#FF6347"></a-box>
```

### Changing Colors

Modify the `color` attribute of any entity:

```html
<a-sphere color="#00FF00"></a-sphere>
```

### Adding Animations

Use A-Frame's animation component:

```html
<a-box animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"></a-box>
```

## Browser Compatibility

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome  | ✅      | ✅     |
| Firefox | ✅      | ✅     |
| Safari  | ✅      | ✅     |
| Edge    | ✅      | ✅     |

## Troubleshooting

### Camera not working
- Ensure you've granted camera permissions
- Check if your browser supports WebRTC
- Try using HTTPS (required for camera access on some browsers)

### Marker not detected
- Ensure good lighting conditions
- Keep the marker flat and fully visible
- Maintain appropriate distance from the marker (20-50cm)
- Make sure the marker is not too small

### Performance issues
- Close other browser tabs
- Use a device with better specifications
- Reduce the number of 3D objects in the scene

## Resources

- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [Hiro Marker Download](https://github.com/AR-js-org/AR.js/blob/master/data/images/hiro.png)

## Future Enhancements

- Add more interactive 3D models
- Implement multiple marker support
- Add sound effects
- Create custom markers
- Add gesture controls
- Progressive Web App (PWA) support

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Acknowledgments

- AR.js team for the amazing AR library
- A-Frame team for the 3D web framework
- The open-source community
