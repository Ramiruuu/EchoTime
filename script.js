// Canvas setup
const canvas = document.getElementById('echoCanvas');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
canvas.width = 500;
canvas.height = 300;

// Mood-to-color mapping
const moodMap = {
    happy: '#e94560', // Red-pink
    sad: '#0f3460',   // Dark blue
    calm: '#a3d8f4',  // Light blue
    default: '#fff'   // White
};

// Store capsules in localStorage
let capsules = JSON.parse(localStorage.getItem('capsules')) || [];

// Event listeners
document.getElementById('create-btn').addEventListener('click', createCapsule);
document.getElementById('view-btn').addEventListener('click', viewCapsule);

// Create a capsule
function createCapsule() {
    const memory = document.getElementById('memory').value.trim();
    if (!memory) {
        status.textContent = 'Please enter a memory!';
        return;
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation not supported!';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const capsule = {
                memory,
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                radius: 0.001 // ~100 meters
            };
            capsules.push(capsule);
            localStorage.setItem('capsules', JSON.stringify(capsules));
            status.textContent = 'Capsule created! Visit this spot later to unlock.';
            document.getElementById('memory').value = '';
        },
        () => status.textContent = 'Failed to get location!'
    );
}

// View a capsule
function viewCapsule() {
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation not supported!';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            const nearbyCapsule = capsules.find(c => {
                const dist = Math.sqrt(
                    Math.pow(c.lat - userLat, 2) + Math.pow(c.lon - userLon, 2)
                );
                return dist <= c.radius;
            });

            if (nearbyCapsule) {
                status.textContent = 'Capsule unlocked: ' + nearbyCapsule.memory;
                animateEcho(nearbyCapsule.memory);
            } else {
                status.textContent = 'No capsules nearby!';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        },
        () => status.textContent = 'Failed to get location!'
    );
}

// Animate the echo
function animateEcho(memory) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let time = 0;
    const mood = detectMood(memory);
    const color = moodMap[mood] || moodMap.default;

    function draw() {
        ctx.fillStyle = `rgba(${hexToRgb(color)}, ${Math.sin(time) * 0.5 + 0.5})`;
        ctx.beginPath();
        const radius = 20 + Math.sin(time) * 10;
        ctx.arc(
            canvas.width / 2 + Math.cos(time) * 50,
            canvas.height / 2 + Math.sin(time) * 30,
            radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
        time += 0.05;
        requestAnimationFrame(draw);
    }
    draw();
}

// Simple mood detection
function detectMood(text) {
    text = text.toLowerCase();
    if (text.includes('happy') || text.includes('joy')) return 'happy';
    if (text.includes('sad') || text.includes('lost')) return 'sad';
    if (text.includes('calm') || text.includes('peace')) return 'calm';
    return 'default';
}

// Convert hex to RGB
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}