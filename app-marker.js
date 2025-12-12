/**
 * Marker-Based AR Application
 * Uses AR.js for marker tracking - Works on ALL devices!
 */

// UI Elements
const infoOverlay = document.getElementById('info-overlay');
const startBtn = document.getElementById('start-ar-btn');
const arScene = document.getElementById('ar-scene');
const modelSelector = document.getElementById('model-selector');
const arStatus = document.getElementById('ar-status');
const statusText = document.getElementById('status-text');
const helpBtn = document.getElementById('help-btn');
const currentModelSpan = document.getElementById('current-model');

// Markers
const hiroMarker = document.getElementById('hiro-marker');
const kanjiMarker = document.getElementById('kanji-marker');
const patternMarker = document.getElementById('pattern-marker');

// State
let currentActiveModel = 'building';
let markerDetected = false;

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 Marker-Based AR Application Loading...');

    // Start AR button
    startBtn.addEventListener('click', startARExperience);

    // Model selection buttons
    const modelButtons = document.querySelectorAll('.model-btn');
    modelButtons.forEach(button => {
        button.addEventListener('click', () => switchModel(button));
    });

    // Help button
    helpBtn.addEventListener('click', () => {
        infoOverlay.style.display = 'flex';
        modelSelector.style.display = 'none';
    });

    console.log('✅ App initialized');
});

// ========================================
// Start AR Experience
// ========================================
function startARExperience() {
    console.log('🚀 Starting AR experience...');

    // Hide overlay, show AR scene
    infoOverlay.style.display = 'none';
    arScene.style.display = 'block';
    modelSelector.style.display = 'block';
    arStatus.style.display = 'block';
    helpBtn.style.display = 'block';

    // Request camera permission
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                console.log('✅ Camera access granted');
                stream.getTracks().forEach(track => track.stop());
                setupMarkerEvents();
            })
            .catch(error => {
                console.error('❌ Camera access denied:', error);
                alert('Please allow camera access to use AR features');
                infoOverlay.style.display = 'flex';
                arScene.style.display = 'none';
            });
    }
}

// ========================================
// Marker Events
// ========================================
function setupMarkerEvents() {
    console.log('🎯 Setting up marker detection...');

    // Hiro marker events
    if (hiroMarker) {
        hiroMarker.addEventListener('markerFound', () => {
            console.log('✅ Hiro marker detected!');
            markerDetected = true;
            updateStatus('✅ Building Marker Found!', 'success');
        });

        hiroMarker.addEventListener('markerLost', () => {
            console.log('⚠️ Hiro marker lost');
            markerDetected = false;
            updateStatus('📍 Point camera at marker', 'info');
        });
    }

    // Kanji marker events
    if (kanjiMarker) {
        kanjiMarker.addEventListener('markerFound', () => {
            console.log('✅ Kanji marker detected!');
            markerDetected = true;
            updateStatus('✅ Floor Plan Marker Found!', 'success');
        });

        kanjiMarker.addEventListener('markerLost', () => {
            console.log('⚠️ Kanji marker lost');
            markerDetected = false;
            updateStatus('📍 Point camera at marker', 'info');
        });
    }

    // Pattern marker events
    if (patternMarker) {
        patternMarker.addEventListener('markerFound', () => {
            console.log('✅ Pattern marker detected!');
            markerDetected = true;
            updateStatus('✅ Equipment Marker Found!', 'success');
        });

        patternMarker.addEventListener('markerLost', () => {
            console.log('⚠️ Pattern marker lost');
            markerDetected = false;
            updateStatus('📍 Point camera at marker', 'info');
        });
    }

    // Scene loaded
    arScene.addEventListener('loaded', () => {
        console.log('✅ AR Scene loaded successfully');
        updateStatus('📍 Point camera at any marker', 'info');
    });
}

// ========================================
// Model Switching
// ========================================
function switchModel(button) {
    const modelType = button.dataset.model;
    const markerType = button.dataset.marker;

    console.log(`🔄 Switching to ${modelType} model on ${markerType} marker`);

    // Update active button
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    // Update current model display
    const modelNames = {
        'building': 'Building on Hiro Marker',
        'floorplan': 'Floor Plan on Kanji Marker',
        'equipment': 'Equipment on Pattern Marker'
    };

    currentModelSpan.textContent = modelNames[modelType];
    currentActiveModel = modelType;

    // Update status
    updateStatus(`🔄 Now showing: ${modelNames[modelType]}`, 'info');

    console.log(`✅ Switched to ${modelType}`);
}

// ========================================
// Status Updates
// ========================================
function updateStatus(message, type = 'info') {
    if (statusText) {
        statusText.textContent = message;

        // Update status style
        arStatus.className = 'ar-status';
        if (type === 'success') {
            arStatus.classList.add('status-success');
        } else if (type === 'error') {
            arStatus.classList.add('status-error');
        }
    }
}

// ========================================
// Performance Monitoring
// ========================================
let frameCount = 0;
let lastTime = Date.now();

function monitorPerformance() {
    frameCount++;
    const currentTime = Date.now();

    if (currentTime >= lastTime + 5000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        console.log(`📊 AR Performance: ${fps} FPS`);
        frameCount = 0;
        lastTime = currentTime;
    }

    requestAnimationFrame(monitorPerformance);
}

// Start monitoring
requestAnimationFrame(monitorPerformance);

// ========================================
// Device Detection
// ========================================
function detectDevice() {
    const userAgent = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isMobile = isIOS || isAndroid;

    console.log('📱 Device Info:', {
        iOS: isIOS,
        Android: isAndroid,
        Mobile: isMobile,
        UserAgent: userAgent
    });

    return { isIOS, isAndroid, isMobile };
}

const deviceInfo = detectDevice();

// ========================================
// Tips for users
// ========================================
console.log(`
🎯 AR.js Marker-Based AR Tips:
1. Print markers on white paper
2. Keep markers flat and well-lit
3. Maintain 20-50cm distance
4. Avoid shadows on markers
5. Each model uses a different marker
6. Works on iPhone Safari! 🎉
`);

console.log('✅ Marker-Based AR App Ready!');
