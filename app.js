/**
 * WebXR AR Application with Surface Detection and Model Placement
 * Uses WebXR Device API and Three.js for markerless AR experiences
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ========================================
// Global Variables
// ========================================
let scene, camera, renderer, gl;
let xrSession = null;
let xrRefSpace = null;
let hitTestSource = null;
let hitTestSourceRequested = false;
let reticle;
let models = {};
let currentModel = 'building';
let placedObjects = [];

// UI Elements
const statusBar = document.getElementById('status-bar');
const statusIcon = document.getElementById('status-icon');
const statusText = document.getElementById('status-text');
const arButton = document.getElementById('ar-button');
const arButtonContainer = document.getElementById('ar-button-container');
const instructions = document.getElementById('instructions');
const modelSelector = document.getElementById('model-selector');
const arInstructions = document.getElementById('ar-instructions');
const unsupportedMessage = document.getElementById('unsupported-message');
const currentModelName = document.getElementById('current-model-name');

// ========================================
// Initialization
// ========================================
async function init() {
    console.log('🚀 Initializing WebXR AR Application...');

    // Check WebXR support
    if (!navigator.xr) {
        console.error('❌ WebXR not available');
        showUnsupportedMessage();
        return;
    }

    // Check for immersive-ar support
    try {
        const isARSupported = await navigator.xr.isSessionSupported('immersive-ar');

        if (isARSupported) {
            console.log('✅ WebXR AR is supported!');
            updateStatus('✅', 'WebXR AR Supported!', 'success');
            setupScene();
            loadModels();
            setupARButton();
        } else {
            console.warn('⚠️ Immersive AR not supported');
            showUnsupportedMessage();
        }
    } catch (error) {
        console.error('❌ Error checking AR support:', error);
        showUnsupportedMessage();
    }
}

// ========================================
// Three.js Scene Setup
// ========================================
function setupScene() {
    console.log('🎬 Setting up Three.js scene...');

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // Create renderer with XR support
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    gl = renderer.getContext();

    // Add lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Create reticle (placement indicator)
    createReticle();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    console.log('✅ Scene setup complete');
}

// ========================================
// Reticle Creation
// ========================================
function createReticle() {
    // Create a ring geometry for the reticle
    const geometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    reticle = new THREE.Mesh(geometry, material);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    // Add inner circle for better visibility
    const innerGeometry = new THREE.CircleGeometry(0.05, 32).rotateX(-Math.PI / 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x764ba2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });
    const innerCircle = new THREE.Mesh(innerGeometry, innerMaterial);
    reticle.add(innerCircle);

    console.log('✅ Reticle created');
}

// ========================================
// Model Loading
// ========================================
function loadModels() {
    console.log('📦 Loading 3D models...');

    // Create placeholder models using Three.js geometry
    // In production, replace with GLTFLoader for actual GLB files

    // Model 1: Building (Box with details)
    const buildingGeometry = new THREE.BoxGeometry(0.3, 0.5, 0.3);
    const buildingMaterial = new THREE.MeshStandardMaterial({
        color: 0x667eea,
        metalness: 0.3,
        roughness: 0.7
    });
    models.building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    models.building.scale.set(0.1, 0.1, 0.1);

    // Add windows to building
    const windowGeometry = new THREE.BoxGeometry(0.05, 0.08, 0.01);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
            window1.position.set(-0.1 + i * 0.1, -0.15 + j * 0.15, 0.151);
            models.building.add(window1);
        }
    }

    // Model 2: Floor Plan (Flat plane with grid)
    const floorplanGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const floorplanMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.8
    });
    models.floorplan = new THREE.Mesh(floorplanGeometry, floorplanMaterial);
    models.floorplan.rotation.x = -Math.PI / 2;
    models.floorplan.scale.set(0.1, 0.1, 0.1);

    // Add grid lines to floor plan
    const gridHelper = new THREE.GridHelper(0.5, 10, 0x764ba2, 0x667eea);
    gridHelper.rotation.x = Math.PI / 2;
    models.floorplan.add(gridHelper);

    // Add walls outline
    const wallMaterial = new THREE.LineBasicMaterial({ color: 0x764ba2, linewidth: 2 });
    const points = [];
    points.push(new THREE.Vector3(-0.2, 0, -0.2));
    points.push(new THREE.Vector3(0.2, 0, -0.2));
    points.push(new THREE.Vector3(0.2, 0, 0));
    points.push(new THREE.Vector3(-0.2, 0, 0));
    points.push(new THREE.Vector3(-0.2, 0, -0.2));
    const wallGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const walls = new THREE.Line(wallGeometry, wallMaterial);
    models.floorplan.add(walls);

    // Model 3: Equipment (Cylinder representing machinery)
    const equipmentGroup = new THREE.Group();

    const baseGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.1, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x764ba2,
        metalness: 0.6,
        roughness: 0.4
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.05;
    equipmentGroup.add(base);

    const bodyGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffc65d,
        metalness: 0.5,
        roughness: 0.5
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.25;
    equipmentGroup.add(body);

    const topGeometry = new THREE.SphereGeometry(0.08, 32, 32);
    const topMaterial = new THREE.MeshStandardMaterial({
        color: 0xef2d5e,
        metalness: 0.7,
        roughness: 0.3
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.y = 0.45;
    equipmentGroup.add(top);

    equipmentGroup.scale.set(0.1, 0.1, 0.1);
    models.equipment = equipmentGroup;

    console.log('✅ Models loaded:', Object.keys(models));
}

// ========================================
// AR Button Setup
// ========================================
function setupARButton() {
    arButtonContainer.style.display = 'block';

    arButton.addEventListener('click', async () => {
        console.log('🎯 AR button clicked');

        if (!xrSession) {
            try {
                // Request AR session - make hit-test OPTIONAL for iOS compatibility
                xrSession = await navigator.xr.requestSession('immersive-ar', {
                    optionalFeatures: ['hit-test', 'dom-overlay'],
                    domOverlay: { root: document.body }
                });

                console.log('✅ AR session started (hit-test optional)');
                await onSessionStarted();
            } catch (error) {
                console.error('❌ Failed to start AR session:', error);
                alert('Failed to start AR session. Please ensure:\n- Camera permissions are granted\n- Device supports WebXR\n- Using HTTPS or localhost');
            }
        } else {
            xrSession.end();
        }
    });

    console.log('✅ AR button ready');
}

// ========================================
// Session Management
// ========================================
async function onSessionStarted() {
    console.log('🎬 AR session started');

    // Update UI
    arButtonContainer.style.display = 'none';
    instructions.style.display = 'none';
    modelSelector.style.display = 'flex';
    arInstructions.style.display = 'block';
    updateStatus('🎯', 'AR Mode Active', 'success');

    // Setup session
    xrSession.addEventListener('end', onSessionEnded);
    xrSession.addEventListener('select', onSelect);

    // Set XR render loop
    await renderer.xr.setSession(xrSession);

    // Get reference space
    xrRefSpace = await xrSession.requestReferenceSpace('local-floor');

    // Start render loop
    renderer.setAnimationLoop(onXRFrame);

    console.log('✅ AR session configured');
}

function onSessionEnded() {
    console.log('👋 AR session ended');

    xrSession = null;
    hitTestSource = null;
    hitTestSourceRequested = false;

    // Update UI
    arButtonContainer.style.display = 'block';
    instructions.style.display = 'block';
    modelSelector.style.display = 'none';
    arInstructions.style.display = 'none';
    updateStatus('✅', 'WebXR AR Supported!', 'success');

    // Hide reticle
    if (reticle) {
        reticle.visible = false;
    }
}

// ========================================
// Hit Testing
// ========================================
async function requestHitTestSource() {
    if (!hitTestSourceRequested) {
        try {
            const session = renderer.xr.getSession();
            hitTestSource = await session.requestHitTestSource({ space: xrRefSpace });
            hitTestSourceRequested = true;
            console.log('✅ Hit test source acquired - using surface detection');

            // Update instructions for hit-test mode
            if (arInstructions) {
                arInstructions.innerHTML = '<p>📍 Move your device to scan surfaces</p><p>Look for the placement reticle</p>';
            }
        } catch (error) {
            console.warn('⚠️ Hit test not available - using fallback placement mode');
            hitTestSourceRequested = true; // Don't try again
            hitTestSource = null;

            // Show fallback reticle at fixed distance
            showFallbackReticle();

            // Update instructions for fallback mode
            if (arInstructions) {
                arInstructions.innerHTML = '<p>👆 Tap to place model 1 meter ahead</p><p>Move closer/farther to adjust distance</p>';
                arInstructions.style.opacity = '1';
            }
        }
    }
}

// Fallback reticle for devices without hit-test (iPhone/IQ3Connect)
function showFallbackReticle() {
    if (!reticle) return;

    console.log('📍 Using fallback placement mode (no hit-test)');
    reticle.visible = true;

    // Position reticle 1 meter in front of camera at floor level
    updateFallbackReticle();
}

function updateFallbackReticle() {
    if (!reticle || hitTestSource) return; // Only for fallback mode

    const camera = renderer.xr.getCamera();
    const direction = new THREE.Vector3(0, 0, -1); // Forward
    direction.applyQuaternion(camera.quaternion);
    direction.y = 0; // Keep at floor level
    direction.normalize();

    // Position 1 meter ahead on the floor
    const position = camera.position.clone();
    position.add(direction.multiplyScalar(1.0));
    position.y = 0; // Floor level

    reticle.position.copy(position);
    reticle.rotation.x = -Math.PI / 2; // Lie flat
    reticle.visible = true;
}

function performHitTest(frame) {
    if (!hitTestSource) return;

    const hitTestResults = frame.getHitTestResults(hitTestSource);

    if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(xrRefSpace);

        if (pose) {
            // Surface detected!
            if (!reticle.visible) {
                console.log('✅ Surface detected! Reticle now visible');
            }
            reticle.visible = true;
            reticle.matrix.fromArray(pose.transform.matrix);

            // Show AR instructions less prominently after surface is found
            if (arInstructions && arInstructions.style.opacity !== '0.5') {
                arInstructions.style.opacity = '0.5';
                arInstructions.innerHTML = '<p>✅ Surface found! Tap to place model</p>';
            }
        }
    } else {
        // No surface detected
        if (reticle.visible) {
            console.log('⚠️ Surface lost. Keep scanning...');
        }
        reticle.visible = false;
        if (arInstructions && arInstructions.style.opacity !== '1') {
            arInstructions.style.opacity = '1';
            arInstructions.innerHTML = '<p>📍 Move your device to scan surfaces</p><p>Look for the placement reticle</p>';
        }
    }
}

// ========================================
// Model Placement
// ========================================
function onSelect() {
    console.log('🎯 Select event triggered!');

    if (!reticle) {
        console.error('❌ Reticle not initialized!');
        return;
    }

    if (!reticle.visible) {
        console.warn('⚠️ Reticle not visible for placement.');
        // Show user feedback
        if (arInstructions) {
            arInstructions.innerHTML = '<p style="color: #ff6b6b;">⚠️ Reticle not visible!</p>';
            setTimeout(() => {
                const mode = hitTestSource ? 'scan surfaces' : '1 meter ahead';
                arInstructions.innerHTML = `<p>👆 Tap to place model ${mode}</p>`;
            }, 2000);
        }
        return;
    }

    console.log(`📍 Placing ${currentModel} model at reticle position`);
    console.log(`Placement mode: ${hitTestSource ? 'Hit-test' : 'Fallback'}`);
    console.log('Current models available:', Object.keys(models));

    if (!models[currentModel]) {
        console.error(`❌ Model ${currentModel} not found!`);
        return;
    }

    try {
        // Clone the selected model
        const modelToPlace = models[currentModel].clone(true);
        console.log('✅ Model cloned successfully');

        // Position at reticle location
        if (hitTestSource) {
            // Hit-test mode: use matrix from hit-test
            modelToPlace.position.setFromMatrixPosition(reticle.matrix);
            const rotation = new THREE.Euler();
            rotation.setFromRotationMatrix(reticle.matrix);
            modelToPlace.rotation.y = rotation.y;
        } else {
            // Fallback mode: use reticle position directly
            modelToPlace.position.copy(reticle.position);
            modelToPlace.rotation.y = renderer.xr.getCamera().rotation.y;
        }

        console.log('Position set:', modelToPlace.position);

        // Add to scene
        scene.add(modelToPlace);
        placedObjects.push(modelToPlace);

        console.log(`✅ Model placed successfully! Total objects: ${placedObjects.length}`);

        // Visual feedback to user
        if (arInstructions) {
            arInstructions.innerHTML = `<p style="color: #4CAF50;">✅ ${currentModel} placed! (Total: ${placedObjects.length})</p>`;
            setTimeout(() => {
                const mode = hitTestSource ?
                    '<p>📍 Move your device to scan surfaces</p><p>Look for the placement reticle</p>' :
                    '<p>👆 Tap to place model 1 meter ahead</p><p>Move closer/farther to adjust distance</p>';
                arInstructions.innerHTML = mode;
            }, 1500);
        }

        // Add placement animation
        const initialScale = modelToPlace.scale.clone();
        modelToPlace.scale.set(0, 0, 0);

        const animateIn = () => {
            if (modelToPlace.scale.x < initialScale.x) {
                modelToPlace.scale.x += initialScale.x * 0.1;
                modelToPlace.scale.y += initialScale.y * 0.1;
                modelToPlace.scale.z += initialScale.z * 0.1;
                requestAnimationFrame(animateIn);
            }
        };
        animateIn();
    } catch (error) {
        console.error('❌ Error placing model:', error);
    }
}

// ========================================
// XR Frame Loop
// ========================================
function onXRFrame(time, frame) {
    const session = frame.session;

    // Request hit test source if not done
    if (!hitTestSourceRequested) {
        requestHitTestSource();
    }

    // Perform hit testing if available
    if (hitTestSource) {
        performHitTest(frame);
    } else if (hitTestSourceRequested && !hitTestSource) {
        // Using fallback mode - update reticle position each frame
        updateFallbackReticle();
    }

    // Render scene
    renderer.render(scene, camera);
}

// ========================================
// Model Selection
// ========================================
function setupModelSelection() {
    const modelButtons = document.querySelectorAll('.model-btn');

    modelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            modelButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Update current model
            currentModel = button.dataset.model;

            // Update UI text
            const modelNames = {
                'building': 'Building',
                'floorplan': 'Floor Plan',
                'equipment': 'Equipment'
            };
            currentModelName.textContent = modelNames[currentModel];

            console.log(`🔄 Switched to ${modelNames[currentModel]} model`);
        });
    });
}

// ========================================
// Utility Functions
// ========================================
function updateStatus(icon, text, type = 'info') {
    statusIcon.textContent = icon;
    statusText.textContent = text;

    statusBar.className = 'status-bar';
    if (type === 'success') {
        statusBar.classList.add('status-success');
    } else if (type === 'error') {
        statusBar.classList.add('status-error');
    }
}

function showUnsupportedMessage() {
    updateStatus('❌', 'WebXR Not Supported', 'error');
    unsupportedMessage.style.display = 'flex';
    instructions.style.display = 'none';
    arButtonContainer.style.display = 'none';
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ========================================
// Start Application
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 WebXR AR Application Loading...');
    init();
    setupModelSelection();
});

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (event) => {
    console.error('💥 Application error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('💥 Unhandled promise rejection:', event.reason);
});

console.log('🎉 App.js loaded successfully');
