# EchoTime
EchoTime Capsule is a unique web application built with HTML, CSS, and JavaScript that allows users to create digital "time capsules" tied to specific geolocations. Users can input a memory, lock it to their current location, and later unlock an abstract, animated "echo" of that memory when they return to the same spot. It’s a blend of nostalgia, generative art, and real-world interaction.

## Features
- **Memory Input**: Write a short memory to encapsulate.
- **Geolocation Lock**: Capsules are tied to your current location (within ~100 meters) using the browser's Geolocation API.
- **Animated Echo**: Unlocking a capsule displays a dynamic animation on an HTML5 Canvas, with colors and motion reflecting the memory’s mood (e.g., "happy" = red-pink, "sad" = dark blue).
- **Local Storage**: Capsules are stored locally in the browser using localStorage.

## Demo
Try it out by creating a capsule at one location and returning to unlock it. The animation pulses and moves based on simple mood detection from your text input.

## Prerequisites
A modern web browser (e.g., Chrome, Firefox) with location services enabled.
Permission to access geolocation (you’ll be prompted).

## Installation
Clone or Download:
Download the project files: index.html, styles.css, script.js, and this README.md.
Alternatively, clone the repository if hosted on a platform like GitHub.

Project Structure:

EchoTime/
├── index.html      # Main HTML structure
├── styles.css      # Styling for the app
├── script.js       # Logic and functionality
└── README.md       # This file

## Run:
Open index.html in a web browser. No server is required as it runs locally, but you can use a simple server (e.g., live-server in VS Code) for a better experience.

## Usage
## #Create a Capsule:
- Open the app in your browser.
- Type a memory in the text area (e.g., "Calm evening by the lake").
- Click **"Create Capsule"** and allow location access when prompted.
- The capsule will be saved with your current coordinates.

### View a Capsule:
- Return to the same location (within ~100 meters).
- Click **"View Nearby Capsule"**.
- If you’re close enough, the memory will display, and an animated echo will appear on the canvas.

### Mood Detection:
- The app employs a simple keyword-based mood detection system. For example, words like "happy" or "joyful" trigger warm colors such as red and pink, while words like "sad" or "melancholy" result in cooler tones like blue. This basic approach adjusts the animation's color palette and movement style to reflect the mood of the memory.

## Example
Input: "Happy day with friends"
Result: A red-pink pulsing circle animates on the canvas when unlocked near the creation spot.

## Limitations
- **Local Storage**: Capsules are stored in the browser's localStorage, making them device-specific. Clearing the browser cache will erase all saved capsules.
- **Geolocation Precision**: The location radius (~100 meters) is approximate and may vary depending on the device or environment.
- **No Sharing**: This version does not include a backend, so capsules cannot be shared across devices.

## Potential Enhancements
- **Backend Integration**: Implement a server (e.g., Node.js with MongoDB) to enable global storage and sharing of capsules.
- **Map Interface**: Use a library like Leaflet.js to display nearby capsules on an interactive map.
- **Sound Effects**: Enhance the experience with ambient sounds using the Web Audio API, synchronized with the animations.
- **Image Upload**: Allow users to attach images to their memories for a richer experience.
- **Time Delay**: Introduce an option to lock capsules until a specific future date.

## Technologies Used
- **HTML5**: Provides the structure and powers the Canvas for animations.
- **CSS3**: Delivers a sleek, minimalistic design.
- **JavaScript**: Handles the app's logic, geolocation, and animations using `requestAnimationFrame`.

## Contributing
Feel free to fork this project, submit pull requests, or suggest features! Ideas for improving the mood detection, animation complexity, or UI are welcome.

## License
This project is open-source and available under the MIT License.