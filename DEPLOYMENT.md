# Deployment Guide - Web AR Application

## 📱 Testing on Mobile Phone

### Option 1: Local Network Access (Recommended for Testing)

**Steps:**

1. **Find your computer's local IP address:**

   - **Windows**: Open Command Prompt and run `ipconfig`, look for "IPv4 Address"
   - **Mac/Linux**: Open Terminal and run `ifconfig` or `ip addr`, look for your WiFi adapter's IP (usually starts with 192.168.x.x or 10.0.x.x)

2. **Start the web server on your computer:**
   ```bash
   python -m http.server 8000
   ```

3. **On your mobile phone:**
   - Connect to the SAME WiFi network as your computer
   - Open browser and go to: `http://YOUR_COMPUTER_IP:8000`
   - Example: `http://192.168.1.100:8000`

4. **Allow camera access** when prompted

**Important Notes:**
- Both devices MUST be on the same WiFi network
- Firewall might block the connection - you may need to allow port 8000
- Some browsers require HTTPS for camera access (see Option 2)

---

### Option 2: Using ngrok (Internet Tunnel - Best for Quick Testing)

**ngrok** creates a secure tunnel to your localhost, giving you a public HTTPS URL.

**Steps:**

1. **Install ngrok:**
   - Download from: https://ngrok.com/download
   - Or use: `npm install -g ngrok` (if you have Node.js)

2. **Start your web server:**
   ```bash
   python -m http.server 8000
   ```

3. **In another terminal, start ngrok:**
   ```bash
   ngrok http 8000
   ```

4. **Copy the HTTPS URL** (looks like: `https://abc123.ngrok.io`)

5. **Open that URL on your mobile phone** - it will work from anywhere!

**Advantages:**
- Works from anywhere (not just local network)
- Provides HTTPS (required by some browsers for camera)
- No firewall issues
- Can share with others for testing

**Limitations:**
- Free tier has session time limits
- URL changes each time you restart ngrok

---

### Option 3: Using Serveo (Alternative to ngrok - No Installation)

**Steps:**

1. **Start your web server:**
   ```bash
   python -m http.server 8000
   ```

2. **Create tunnel with SSH:**
   ```bash
   ssh -R 80:localhost:8000 serveo.net
   ```

3. **Use the provided URL** on your mobile phone

---

## 🌐 Publishing Online (Production Deployment)

For permanent hosting, deploy to one of these platforms:

### Option A: GitHub Pages (FREE)

**Steps:**

1. **Ensure your repository is public on GitHub**

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Select your branch (e.g., `main` or `claude/simple-web-ar-app-01XrALUncVESwg4hYbJqFt5v`)
   - Click Save

3. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/web-ar/
   ```

**Advantages:**
- Completely free
- Automatic HTTPS
- Easy to update (just push to GitHub)
- No account required beyond GitHub

---

### Option B: Netlify (FREE with Features)

**Steps:**

1. **Sign up at:** https://www.netlify.com/

2. **Deploy via Git (Recommended):**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Deploy!

3. **Or use Netlify Drop (Drag & Drop):**
   - Drag your project folder to Netlify Drop
   - Instant deployment

**Your site URL:** `https://random-name.netlify.app` (can customize)

**Advantages:**
- Free tier is generous
- Custom domain support
- Automatic HTTPS
- Continuous deployment from Git
- Easy rollbacks

---

### Option C: Vercel (FREE)

**Steps:**

1. **Sign up at:** https://vercel.com/

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy from project directory:**
   ```bash
   cd /home/user/web-ar
   vercel
   ```

4. **Follow the prompts** - your site will be live in seconds!

**Your site URL:** `https://your-project.vercel.app`

**Advantages:**
- Extremely fast deployment
- Free tier available
- Automatic HTTPS
- Great performance

---

### Option D: Surge.sh (FREE, Super Simple)

**Steps:**

1. **Install Surge:**
   ```bash
   npm install -g surge
   ```

2. **Deploy:**
   ```bash
   cd /home/user/web-ar
   surge
   ```

3. **Follow prompts** to create account and deploy

**Your site URL:** `https://your-project.surge.sh`

**Advantages:**
- Simplest deployment
- Free forever
- No build process needed
- Instant updates

---

### Option E: Cloudflare Pages (FREE)

**Steps:**

1. **Sign up at:** https://pages.cloudflare.com/

2. **Connect your Git repository**

3. **Configure build settings:**
   - Build command: (leave empty)
   - Build output directory: `/`

4. **Deploy!**

**Advantages:**
- Part of Cloudflare's global CDN
- Very fast worldwide
- Free SSL
- Unlimited bandwidth

---

## 📋 Quick Comparison

| Platform | Free Tier | HTTPS | Custom Domain | Best For |
|----------|-----------|-------|---------------|----------|
| **GitHub Pages** | ✅ Yes | ✅ Yes | ✅ Yes | Open source projects |
| **Netlify** | ✅ Yes | ✅ Yes | ✅ Yes | Full-featured hosting |
| **Vercel** | ✅ Yes | ✅ Yes | ✅ Yes | Fast deployment |
| **Surge** | ✅ Yes | ✅ Yes | ✅ Yes | Quick prototypes |
| **Cloudflare** | ✅ Yes | ✅ Yes | ✅ Yes | Global performance |
| **ngrok** | ⚠️ Limited | ✅ Yes | ❌ No | Quick testing only |

---

## 🔐 Important: HTTPS Requirement

Modern browsers **require HTTPS** for camera access (except on localhost). This means:

- ✅ `https://example.com` - Will work
- ✅ `http://localhost:8000` - Will work
- ❌ `http://192.168.1.100:8000` - May NOT work on some browsers

**Solution:** Use ngrok for testing or deploy to any of the platforms above (all provide free HTTPS).

---

## 🎯 Recommended Workflow

1. **Development:** Use local server (`http://localhost:8000`)
2. **Mobile Testing:** Use ngrok (`https://abc123.ngrok.io`)
3. **Production:** Deploy to Netlify or GitHub Pages

---

## 🚀 Quick Start Commands

**For Local Testing with ngrok:**
```bash
# Terminal 1: Start web server
cd /home/user/web-ar
python -m http.server 8000

# Terminal 2: Start ngrok
ngrok http 8000
```

**For Quick Online Deployment (Surge):**
```bash
npm install -g surge
cd /home/user/web-ar
surge
```

**For GitHub Pages Deployment:**
```bash
# Merge your feature branch to main (if needed)
git checkout main
git merge claude/simple-web-ar-app-01XrALUncVESwg4hYbJqFt5v
git push origin main

# Then enable GitHub Pages in repository settings
```

---

## 📱 Testing Checklist

- [ ] Camera permissions granted
- [ ] Hiro marker printed or displayed on screen
- [ ] Good lighting conditions
- [ ] Marker held 20-50cm from camera
- [ ] Marker is flat and fully visible
- [ ] Using HTTPS connection (if not localhost)

---

## 🆘 Troubleshooting

**"Camera not accessible"**
- Ensure you're using HTTPS (or localhost)
- Check browser permissions
- Try a different browser (Chrome/Firefox recommended)

**"Can't access from phone"**
- Verify both devices on same WiFi
- Check firewall settings
- Try ngrok instead

**"Marker not detected"**
- Improve lighting
- Keep marker flat
- Move closer/farther from camera
- Ensure marker is clearly visible

---

## 💡 Pro Tip

For the best mobile testing experience, use **ngrok** with its HTTPS URL. It's fast, reliable, and works exactly like a production deployment!
