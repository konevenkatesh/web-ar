# 🔧 WebXR AR Troubleshooting Guide

## 🚨 Models Not Appearing / Deploying on Screen

If you're having trouble placing models, follow this step-by-step guide to diagnose and fix the issue.

---

## 📋 Quick Diagnostic Checklist

Run through this checklist first:

- [ ] Using **Android device** (not iPhone/iPad/Desktop)
- [ ] Using **Chrome for Android** version 79 or higher
- [ ] Device has **ARCore installed** and updated
- [ ] Accessing via **HTTPS** (or localhost for testing)
- [ ] **Camera permission** granted to the browser
- [ ] Device is **ARCore compatible** ([Check here](https://developers.google.com/ar/devices))

---

## 🔍 Diagnostics Tool

**FIRST: Run the diagnostic tool to identify issues**

1. Open `debug.html` in your browser on the same device
2. It will automatically run tests and show you what's wrong
3. Follow the recommendations shown

Example:
```
https://yourdomain.com/debug.html
```

---

## 🐛 Common Issues & Solutions

### ❌ Issue 1: "WebXR Not Supported" Message

**Symptoms:**
- Red error message appears immediately
- No "Enter AR" button visible
- Message says "WebXR Not Supported"

**Causes:**
- Using iOS device (Safari doesn't support WebXR)
- Using desktop browser
- Using old Android version
- Using browser other than Chrome/Samsung Internet

**Solutions:**

✅ **For iOS Users:**
```
Unfortunately, WebXR is not supported on iOS/Safari.
You need an Android device with ARCore support.
```

✅ **For Desktop Users:**
```
WebXR AR requires a mobile device with camera and AR capabilities.
This app won't work on desktop browsers.
```

✅ **For Android Users:**
1. Install Google Chrome for Android
2. Update Chrome to latest version (Settings → About Chrome)
3. Install Google Play Services for AR (ARCore):
   - Open Google Play Store
   - Search "Google Play Services for AR"
   - Install/Update

---

### ❌ Issue 2: "Enter AR" Button Appears But Nothing Happens

**Symptoms:**
- Green status shows "WebXR AR Supported"
- "Enter AR" button is visible
- Tapping button does nothing or shows error

**Causes:**
- Camera permission not granted
- Another app using camera
- ARCore not properly installed

**Solutions:**

✅ **Grant Camera Permission:**
1. Long-press on the address bar
2. Tap "Site Settings"
3. Find "Camera" permission
4. Set to "Allow"
5. Refresh the page
6. Try "Enter AR" again

✅ **Close Other Camera Apps:**
1. Close all other apps (especially camera/video apps)
2. Restart Chrome
3. Try again

✅ **Clear Browser Cache:**
1. Chrome Settings → Privacy and Security
2. Clear Browsing Data
3. Select "Cached images and files"
4. Clear data
5. Reload the page

---

### ❌ Issue 3: Camera Opens But No Reticle (Blue Ring) Appears

**Symptoms:**
- AR mode starts successfully
- See camera view
- No blue/purple ring appears on surfaces
- Status says "Move your device to scan surfaces"

**Causes:**
- Not moving device enough
- Poor lighting conditions
- Looking at reflective/transparent surfaces
- Looking at blank walls or uniform surfaces

**Solutions:**

✅ **Scan Properly:**
1. **Move your device slowly** in different directions
2. **Tilt** the device up and down slightly
3. **Point at textured surfaces** (tables, floors with patterns)
4. **Avoid:**
   - Blank white walls
   - Mirrors or glass
   - Very dark areas
   - Solid color surfaces

✅ **Improve Lighting:**
1. Turn on room lights
2. Go near a window (natural light helps)
3. Avoid direct sunlight on camera

✅ **Try Different Surfaces:**
- ✅ **Good:** Wooden floor, patterned carpet, textured table
- ❌ **Bad:** White walls, glass tables, mirrors

---

### ❌ Issue 4: Reticle Appears But Models Don't Place

**Symptoms:**
- Blue/purple ring (reticle) is visible
- Tapping screen does nothing
- No model appears

**Causes:**
- Tap not being registered
- JavaScript errors
- Model loading failed

**Solutions:**

✅ **Check Browser Console:**
1. Open Chrome Developer Tools:
   - Chrome → Menu (⋮) → More Tools → Developer Tools
   - Or use the Remote Debugging method below
2. Look at Console tab
3. Check for errors (red text)
4. Take screenshot and report if you see errors

✅ **Try Different Tap Locations:**
1. Tap **directly on the reticle** (blue ring)
2. Tap firmly (not too fast)
3. Wait 1-2 seconds between taps

✅ **Switch Models:**
1. Try tapping different model buttons (Building, Floor Plan, Equipment)
2. See if any model places

---

### ❌ Issue 5: Models Place But Are Invisible

**Symptoms:**
- Console shows "Model placed successfully"
- No visible model in AR view
- Counter increases but nothing appears

**Causes:**
- Models too small or too large
- Models positioned incorrectly
- Rendering issue

**Solutions:**

✅ **Check Console Logs:**
Look for messages like:
- "✅ Model cloned successfully"
- "Position set: [x, y, z]"
- "✅ Model placed successfully!"

✅ **Try Different Distances:**
1. Move closer to where you placed model
2. Move farther away
3. Look around with camera

✅ **Restart AR Session:**
1. Exit AR (back button)
2. Re-enter AR mode
3. Try placing again

---

## 🛠️ Advanced Debugging

### Remote Debugging (Best Method)

To see console logs from your Android device on your computer:

**Setup:**
1. Enable **Developer Options** on Android:
   - Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Settings → Developer Options
   - Turn on "USB Debugging"
3. Connect Android device to computer via USB
4. Open Chrome on computer
5. Go to `chrome://inspect#devices`
6. Find your device
7. Click "Inspect" next to the WebXR app tab
8. Check Console for errors

**What to Look For:**
```javascript
// Good messages:
✅ WebXR AR is supported!
✅ Scene setup complete
✅ Models loaded: building, floorplan, equipment
✅ AR session started
✅ Hit test source acquired
✅ Surface detected! Reticle now visible
✅ Model placed successfully! Total objects: 1

// Bad messages:
❌ WebXR not available
❌ Immersive AR not supported
❌ Hit test source request failed
❌ Model not found!
❌ Error placing model
```

---

## 📱 Device-Specific Issues

### Samsung Devices
- Use **Samsung Internet** browser as alternative to Chrome
- Update Samsung Internet to latest version
- Ensure Samsung AR features are enabled

### Pixel Devices
- Usually work perfectly
- Ensure Android and Chrome are updated

### Other Devices
- Check [ARCore supported devices list](https://developers.google.com/ar/devices)
- Some budget phones may not support ARCore

---

## 🌐 Network/Hosting Issues

### HTTPS Required
WebXR **ONLY** works on:
- `https://` URLs
- `localhost` (for testing)

**If using HTTP:**
- Deploy to GitHub Pages (automatic HTTPS)
- Use Netlify/Vercel (automatic HTTPS)
- Add SSL certificate to your server

**Testing Locally:**
```bash
# These work for local testing:
http://localhost:8000      ✅
http://127.0.0.1:8000      ✅

# These do NOT work:
http://192.168.1.5:8000    ❌ (use HTTPS tunnel)
http://mysite.com          ❌ (use HTTPS)
```

**Use ngrok for remote testing over HTTPS:**
```bash
# Install ngrok
npm install -g ngrok

# Run your server
python3 -m http.server 8000

# In another terminal, create HTTPS tunnel
ngrok http 8000

# Use the https://xxx.ngrok.io URL on mobile
```

---

## 📊 Performance Issues

### Models Appear But App is Laggy

**Solutions:**
1. **Close background apps**
2. **Reduce placed models:**
   - Start fresh (reload page)
   - Place fewer models
3. **Simplify models:**
   - Use simpler geometry
   - Reduce texture sizes if using custom GLB

---

## ✅ Verification Steps

### Test That Everything Works:

1. **Open app on Android Chrome**
   - Expected: See gradient background with instructions

2. **Check status bar**
   - Expected: "✅ WebXR AR Supported!" in green

3. **Tap "Enter AR"**
   - Expected: Camera view opens

4. **Grant camera permission**
   - Expected: See real-world view

5. **Move device to scan**
   - Expected: Blue/purple ring appears on flat surfaces

6. **Tap on reticle**
   - Expected: 3D model appears and animates in

7. **Switch model type**
   - Expected: Next placement uses new model

8. **Place multiple models**
   - Expected: All models remain visible

---

## 📞 Still Having Issues?

### Collect This Information:

1. **Device Information:**
   - Device model: _____________
   - Android version: _____________
   - Chrome version: _____________

2. **Console Errors:**
   - Open Chrome DevTools (remote debugging)
   - Copy any red errors from Console
   - Screenshot the Console tab

3. **What You See:**
   - Describe exactly what happens
   - At what step does it fail?
   - Any error messages shown?

4. **URL You're Using:**
   - Is it HTTPS? _____________
   - Full URL: _____________

### Report Issue:
Create a GitHub issue with the above information.

---

## 🎯 Success Indicators

**You know it's working when:**

✅ Status shows "WebXR AR Supported!" (green)
✅ "Enter AR" button appears
✅ Camera opens when button tapped
✅ Blue ring (reticle) appears on flat surfaces
✅ Tapping places 3D model
✅ Model stays in place when moving device
✅ Can place multiple models
✅ Can switch between model types

---

## 🔗 Additional Resources

- [WebXR Device API Specification](https://www.w3.org/TR/webxr/)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [Three.js Documentation](https://threejs.org/docs/)
- [Chrome WebXR Samples](https://immersive-web.github.io/webxr-samples/)

---

**Last Updated:** December 2024
**App Version:** 1.0.0
**WebXR API:** Immersive AR with Hit-Test
