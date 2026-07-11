document.addEventListener('DOMContentLoaded', async () => {
    // Default settings values
    const DEFAULTS = {
        activeCharacter: "sir-nerdington",
        wanderMode: "wander",
        speechEnabled: true,
        scale: 1.0,
        speed: 1.0,
        isAsleep: false
    };

    // DOM Elements
    const cards = document.querySelectorAll('.character-card');
    const wanderModeToggle = document.getElementById('wanderModeToggle');
    const speechToggle = document.getElementById('speechToggle');
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleVal = document.getElementById('scaleVal');
    const speedSlider = document.getElementById('speedSlider');
    const speedVal = document.getElementById('speedVal');
    const sleepBtn = document.getElementById('sleepBtn');

    // Load initial settings
    let settings = {};
    try {
        const stored = await chrome.storage.local.get(Object.keys(DEFAULTS));
        settings = { ...DEFAULTS, ...stored };
    } catch (err) {
        console.error("Failed to load settings from storage", err);
        settings = { ...DEFAULTS };
    }

    // Initialize UI state
    updateUI(settings);

    // Event Listeners: Character Cards
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            const charName = card.getAttribute('data-character');
            
            // Update active class in popup
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Save to storage
            await chrome.storage.local.set({ activeCharacter: charName });
        });
    });

    // Event Listeners: Wander Mode Toggle
    wanderModeToggle.addEventListener('change', async () => {
        const mode = wanderModeToggle.checked ? 'mouse' : 'wander';
        await chrome.storage.local.set({ wanderMode: mode });
    });

    // Event Listeners: Speech Toggle
    speechToggle.addEventListener('change', async () => {
        await chrome.storage.local.set({ speechEnabled: speechToggle.checked });
    });

    // Event Listeners: Scale Slider
    scaleSlider.addEventListener('input', () => {
        const val = parseFloat(scaleSlider.value).toFixed(1);
        scaleVal.textContent = `${val}x`;
    });

    scaleSlider.addEventListener('change', async () => {
        const val = parseFloat(scaleSlider.value);
        await chrome.storage.local.set({ scale: val });
    });

    // Event Listeners: Speed Slider
    speedSlider.addEventListener('input', () => {
        const val = parseFloat(speedSlider.value).toFixed(1);
        speedVal.textContent = `${val}x`;
    });

    speedSlider.addEventListener('change', async () => {
        const val = parseFloat(speedSlider.value);
        await chrome.storage.local.set({ speed: val });
    });

    // Event Listeners: Sleep/Wake Button
    sleepBtn.addEventListener('click', async () => {
        const isAsleep = !sleepBtn.classList.contains('active-sleep');
        await chrome.storage.local.set({ isAsleep: isAsleep });
        
        // Update button appearance
        setSleepBtnState(isAsleep);
    });

    // Function to apply settings to popup elements
    function updateUI(s) {
        // Active character card
        cards.forEach(card => {
            if (card.getAttribute('data-character') === s.activeCharacter) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Wander mode toggle (checked means follow mouse)
        wanderModeToggle.checked = (s.wanderMode === 'mouse');

        // Speech bubbles toggle
        speechToggle.checked = s.speechEnabled;

        // Size slider
        scaleSlider.value = s.scale;
        scaleVal.textContent = `${s.scale.toFixed(1)}x`;

        // Speed slider
        speedSlider.value = s.speed;
        speedVal.textContent = `${s.speed.toFixed(1)}x`;

        // Sleep state button
        setSleepBtnState(s.isAsleep);
    }

    function setSleepBtnState(isAsleep) {
        const textSpan = sleepBtn.querySelector('span');
        if (isAsleep) {
            sleepBtn.classList.add('active-sleep');
            textSpan.textContent = 'Wake Up';
            sleepBtn.querySelector('svg').innerHTML = '<path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0z"></path>';
        } else {
            sleepBtn.classList.remove('active-sleep');
            textSpan.textContent = 'Send to Sleep';
            sleepBtn.querySelector('svg').innerHTML = '<path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path><path d="M12 6v6l4 2"></path>';
        }
    }
});