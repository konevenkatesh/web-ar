// Simple Web AR Application
// This script provides additional functionality for the AR experience

document.addEventListener('DOMContentLoaded', function() {
    console.log('AR Application loaded successfully');

    // Check if the browser supports WebRTC for camera access
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera access. Please use a modern browser like Chrome or Firefox.');
        return;
    }

    // Add status message element
    const statusDiv = document.createElement('div');
    statusDiv.className = 'ar-status';
    statusDiv.id = 'ar-status';
    document.body.appendChild(statusDiv);

    // Get the AR scene
    const scene = document.querySelector('a-scene');

    if (scene) {
        // Scene loaded event
        scene.addEventListener('loaded', function() {
            console.log('AR Scene loaded');
            showStatus('AR Scene Ready! Point camera at Hiro marker', 3000);
        });

        // Get the marker element
        const marker = document.querySelector('a-marker');

        if (marker) {
            // Marker found event
            marker.addEventListener('markerFound', function() {
                console.log('Marker detected!');
                showStatus('Marker Detected! 🎯', 2000);
            });

            // Marker lost event
            marker.addEventListener('markerLost', function() {
                console.log('Marker lost');
                showStatus('Marker Lost - Point camera at marker', 2000);
            });
        }
    }

    // Function to show status messages
    function showStatus(message, duration = 3000) {
        const status = document.getElementById('ar-status');
        if (status) {
            status.textContent = message;
            status.classList.add('active');

            setTimeout(() => {
                status.classList.remove('active');
            }, duration);
        }
    }

    // Request camera permissions on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                console.log('Camera access granted');
                // Stop the stream as AR.js will handle it
                stream.getTracks().forEach(track => track.stop());
            })
            .catch(function(error) {
                console.error('Camera access denied:', error);
                alert('Please allow camera access to use AR features');
            });
    }

    // Add orientation change handler for mobile
    window.addEventListener('orientationchange', function() {
        location.reload();
    });

    // Performance monitoring
    let lastTime = Date.now();
    let frames = 0;

    function checkPerformance() {
        frames++;
        const currentTime = Date.now();

        if (currentTime >= lastTime + 5000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastTime));
            console.log(`AR Performance: ${fps} FPS`);
            frames = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(checkPerformance);
    }

    requestAnimationFrame(checkPerformance);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
