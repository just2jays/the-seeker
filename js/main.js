(function() {
    // Prevent duplicate injection
    if (window.hasSeekerInjected) return;
    window.hasSeekerInjected = true;

    // Default settings configuration
    const DEFAULT_SETTINGS = {
        activeCharacter: "sir-nerdington",
        wanderMode: "wander", // "wander" or "mouse"
        speechEnabled: true,
        scale: 1.0,
        speed: 1.0,
        isAsleep: false
    };

    // Character dimensions map
    const CHARACTER_SIZES = {
        "cat-soldier": { w: 120, h: 150 },
        "sir-nerdington": { w: 80, h: 80 },
        "the-robot": { w: 142, h: 80 },
        "puppy": { w: 130, h: 130 }
    };

    // Character dialogues dictionary
    const CHARACTER_DIALOGUES = {
        "sir-nerdington": {
            periodic: [
                "Have you checked the console lately?",
                "This webpage is using too many divs.",
                "I wonder if this site is built with React...",
                "According to my calculations, we are browsing.",
                "Coffee level: dangerously low.",
                "Did you try turning it off and on again?",
                "Ah, a fine day for documentation!",
                "Let's see what JavaScript errors we can find here."
            ],
            clicked: [
                "Ouch! Watch the cursor, please.",
                "Yes? I was running an algorithm.",
                "That's a click event right there.",
                "Please do not double-click me.",
                "Hello! Need some tech support?"
            ],
            scroll: [
                "Scrolling detected! Optimizing viewport...",
                "Whoa, watch the scroll speed!",
                "Going down! Hold your style sheets!"
            ]
        },
        "cat-soldier": {
            periodic: [
                "Area is secure, Commander!",
                "Scanning for malicious scripts...",
                "A good soldier is always alert.",
                "No bugs detected on this perimeter.",
                "Requesting catnip reinforcement!",
                "We must defend this tab!",
                "Stay frosty out there.",
                "Permission to nap, Commander?"
            ],
            clicked: [
                "Sir! Yes, Sir!",
                "Report! No anomalies found.",
                "Who goes there? Oh, it's you.",
                "Hey, that tickles the fur!",
                "Ready for orders!"
            ],
            scroll: [
                "Advancing to new coordinates!",
                "Securing lower sectors!",
                "Moving out! Keep your eyes open!"
            ]
        },
        "the-robot": {
            periodic: [
                "System status: 100% operational.",
                "Beep boop! Hello, human.",
                "Loading motivation.exe... Complete.",
                "Analyzing DOM structure... High complexity.",
                "I compute a 99% probability of coffee break.",
                "Warning: Cute overload imminent.",
                "Processing webpage contents...",
                "Ping: 5ms. Connection stable."
            ],
            clicked: [
                "Click event registered.",
                "Input detected: Human finger.",
                "BZZZT! That tickles my circuits.",
                "Rebooting humor processor... Ha, ha.",
                "Status: Happy."
            ],
            scroll: [
                "Viewport coordinates updated.",
                "Scrolling... Processing pixels.",
                "Descending into lower DOM levels."
            ]
        },
        "puppy": {
            periodic: [
                "Woof! What's this page about?",
                "You are my favorite human!",
                "Can we play with the cursor? Please?",
                "Did you say... treat?!",
                "I'm helping! Look at me go!",
                "I love browsing the web with you!",
                "*pant pant* So many links to sniff!",
                "Tail wag status: maximum speed!"
            ],
            clicked: [
                "Bark! You petted me!",
                "Wag wag wag! More scratches please!",
                "Hey! Can we go chase some cookies?",
                "*lick lick*",
                "Yay! Human interaction!"
            ],
            scroll: [
                "Wheee! Follow the scroll!",
                "Wait for me! Let's explore down here!",
                "So many new things down here!"
            ]
        }
    };

    class SeekerCompanion {
        constructor() {
            this.settings = { ...DEFAULT_SETTINGS };
            this.currentX = Math.random() * (window.innerWidth - 100);
            this.currentY = Math.random() * (window.innerHeight - 100);
            this.targetX = this.currentX;
            this.targetY = this.currentY;
            
            this.isMoving = false;
            this.lastScrollTime = 0;
            
            // Timers
            this.idleTimer = null;
            this.speechPeriodicTimer = null;
            this.bubbleHideTimer = null;

            // DOM elements
            this.container = null;
            this.sprite = null;
            this.bubble = null;

            // Bind methods
            this.updateLoop = this.updateLoop.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onScroll = this.onScroll.bind(this);

            this.init();
        }

        async init() {
            // Load settings from storage
            try {
                const stored = await chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS));
                this.settings = { ...DEFAULT_SETTINGS, ...stored };
            } catch (err) {
                console.error("The Seeker: Failed to load storage settings", err);
            }

            // Create DOM elements
            this.createDOM();

            // Set initial state
            this.applyAllSettings();

            // Register event listeners
            window.addEventListener('scroll', this.onScroll, { passive: true });
            chrome.storage.onChanged.addListener((changes) => this.handleStorageChange(changes));

            // Start animation loop
            requestAnimationFrame(this.updateLoop);

            // Start speech loop
            this.startSpeechLoop();
        }

        createDOM() {
            // Main container
            this.container = document.createElement('div');
            this.container.id = 'sprite-container';

            // Sprite element
            this.sprite = document.createElement('div');
            this.sprite.className = 'sprite';
            this.container.appendChild(this.sprite);

            // Speech bubble
            this.bubble = document.createElement('div');
            this.bubble.className = 'seeker-speech-bubble';
            this.container.appendChild(this.bubble);

            // Append to body
            document.body.appendChild(this.container);

            // Sprite click action
            this.sprite.addEventListener('click', () => {
                this.speakRandom('clicked');
            });
        }

        applyAllSettings() {
            // Sleep / Awake status
            if (this.settings.isAsleep) {
                this.container.style.display = 'none';
            } else {
                this.container.style.display = 'block';
            }

            // Set size scaling
            this.container.style.setProperty('--scale', this.settings.scale);

            // Set current position variables immediately on start/update
            this.container.style.setProperty('--x', `${this.currentX}px`);
            this.container.style.setProperty('--y', `${this.currentY}px`);

            // Update active character class and dimensions
            const char = this.settings.activeCharacter;
            this.sprite.className = `sprite ${char}`;
            
            const size = CHARACTER_SIZES[char] || { w: 80, h: 80 };
            this.container.style.setProperty('--width', `${size.w}px`);
            this.container.style.setProperty('--height', `${size.h}px`);

            // Set absolute background image URL dynamically to bypass relative path issues on third-party pages
            const imgUrl = chrome.runtime.getURL(`images/sprite_${char}.png`);
            this.sprite.style.setProperty('--bg-img', `url("${imgUrl}")`);

            // Apply movement settings
            this.setupMovementMode();
        }

        setupMovementMode() {
            // Clean up old events/timers
            window.removeEventListener('mousemove', this.onMouseMove);
            if (this.idleTimer) {
                clearTimeout(this.idleTimer);
                this.idleTimer = null;
            }

            if (this.settings.wanderMode === 'mouse') {
                window.addEventListener('mousemove', this.onMouseMove);
            } else {
                // Instantly pick a target in wander mode
                this.pickNewWanderTarget();
            }
        }

        pickNewWanderTarget() {
            if (this.settings.wanderMode !== 'wander' || this.settings.isAsleep) return;

            const char = this.settings.activeCharacter;
            const size = CHARACTER_SIZES[char] || { w: 80, h: 80 };
            const scale = this.settings.scale;
            
            const maxX = window.innerWidth - (size.w * scale);
            const maxY = window.innerHeight - (size.h * scale);

            this.targetX = Math.max(10, Math.random() * maxX);
            this.targetY = Math.max(10, Math.random() * maxY);

            this.container.classList.remove('stopped');
        }

        onMouseMove(e) {
            if (this.settings.isAsleep) return;

            const char = this.settings.activeCharacter;
            const size = CHARACTER_SIZES[char] || { w: 80, h: 80 };
            const scale = this.settings.scale;

            // Center character at the mouse cursor
            this.targetX = e.clientX - (size.w * scale) / 2;
            this.targetY = e.clientY - (size.h * scale) / 2;

            this.container.classList.remove('stopped');
        }

        onScroll() {
            if (this.settings.isAsleep || !this.settings.speechEnabled) return;

            const now = Date.now();
            // 45-second cooldown on scroll reactions to avoid annoying the user
            if (now - this.lastScrollTime > 45000) {
                this.lastScrollTime = now;
                setTimeout(() => {
                    this.speakRandom('scroll');
                }, 1000); // slight delay to feel natural
            }
        }

        handleStorageChange(changes) {
            let needsReapply = false;

            for (const [key, { newValue }] of Object.entries(changes)) {
                if (DEFAULT_SETTINGS[key] !== undefined) {
                    this.settings[key] = newValue;
                    needsReapply = true;
                }
            }

            if (needsReapply) {
                this.applyAllSettings();
            }
        }

        showSpeech(text) {
            if (!this.settings.speechEnabled || this.settings.isAsleep) return;

            this.bubble.textContent = text;
            this.bubble.classList.add('visible');

            if (this.bubbleHideTimer) clearTimeout(this.bubbleHideTimer);
            this.bubbleHideTimer = setTimeout(() => {
                this.bubble.classList.remove('visible');
            }, 4000); // Speak for 4 seconds
        }

        speakRandom(type) {
            const char = this.settings.activeCharacter;
            const quotes = CHARACTER_DIALOGUES[char]?.[type];
            if (quotes && quotes.length > 0) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                this.showSpeech(randomQuote);
            }
        }

        startSpeechLoop() {
            const queueNextSpeech = () => {
                // Speech every 20-40 seconds
                const delay = 20000 + Math.random() * 20000;
                this.speechPeriodicTimer = setTimeout(() => {
                    // Only speak periodically if stopped (sleeping/idle)
                    if (this.container.classList.contains('stopped')) {
                        this.speakRandom('periodic');
                    }
                    queueNextSpeech();
                }, delay);
            };
            queueNextSpeech();
        }

        updateLoop() {
            if (this.settings.isAsleep) {
                requestAnimationFrame(this.updateLoop);
                return;
            }

            const dx = this.targetX - this.currentX;
            const dy = this.targetY - this.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Stop moving if close enough
            if (dist > 2) {
                this.isMoving = true;
                this.container.classList.remove('stopped');

                // Determine orientation based on dx
                const char = this.settings.activeCharacter;
                let dir = 1;
                if (dx < -0.1) {
                    dir = (char === 'the-robot') ? 1 : -1;
                } else if (dx > 0.1) {
                    dir = (char === 'the-robot') ? -1 : 1;
                }
                this.sprite.style.setProperty('--dir', dir);

                // Lerp movement
                // Base lerp factor: 0.03 (smooth, gradual movement)
                const baseLerp = 0.03;
                const speedMultiplier = this.settings.speed;
                const step = Math.min(0.2, baseLerp * speedMultiplier);

                this.currentX += dx * step;
                this.currentY += dy * step;

                this.container.style.setProperty('--x', `${this.currentX}px`);
                this.container.style.setProperty('--y', `${this.currentY}px`);
            } else {
                if (this.isMoving) {
                    this.isMoving = false;
                    this.container.classList.add('stopped');

                    // If in wander mode and we just reached our target, set a timer to wander again
                    if (this.settings.wanderMode === 'wander') {
                        if (this.idleTimer) clearTimeout(this.idleTimer);
                        this.idleTimer = setTimeout(() => {
                            this.pickNewWanderTarget();
                        }, 2000 + Math.random() * 3000); // Idle for 2-5 seconds
                    }
                }
            }

            requestAnimationFrame(this.updateLoop);
        }
    }

    // Initialize the companion
    new SeekerCompanion();
})();
