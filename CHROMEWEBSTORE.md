# Chrome Web Store Listing — The Seeker

> Last Updated: 2026-07-11

## Store Listing

**Extension Name**  
The Seeker

**Short Description**  
Little companion friends right in your browser! Custom animated characters that wander around or follow your cursor.

**Detailed Description**  
Add a little companion to your browser! The Seeker brings custom, animated pixel-art characters directly onto your web pages. Watch them stroll around your tabs, react to your scroll, and respond to your clicks.

Choose from four distinct characters:
- Cat Soldier: A tactical feline dedicated to scanning your tabs.
- Sir Nerdington: A nerdy developer advisor who comments on web standards.
- The Robot: A calculated iron companion computing browsing percentages.
- Puppy: An energetic tail-wagging puppy who loves chasing your mouse.

Customize your companion's behavior through a beautiful settings popup:
- Size Scale: Adjust their size to be tiny, normal, or large.
- Walking Speed: Choose how fast they stroll across pages.
- Wander Mode: Set them to wander randomly or track and follow your cursor in real-time.
- Speech Bubbles: Toggle whether they chime in with funny, character-specific quotes.
- Go to Sleep: Easily hide the companion temporarily without disabling the extension.

The Seeker is lightweight, safe, and operates entirely locally on your device.

**Category**  
Fun

**Single Purpose**  
Displays a customizable animated companion character on web pages.

**Primary Language**  
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon | 128×128 PNG | ✅ Ready | `icons/seeker_128px.png` |
| Screenshot 1 | 1280×800 or 640×400 | ⬜ Not created | |
| Small Promo Tile | 440×280 | ⬜ Not created | |

### Screenshot Notes
- **Screenshot 1**: Show Sir Nerdington wandering on a popular web page (e.g. Wikipedia or GitHub) with a funny speech bubble visible.
- **Screenshot 2**: Show the Robot following the mouse cursor on a dark webpage.
- **Screenshot 3**: Show the Puppy jumping around next to the open settings popup, highlighting the modern glassmorphic settings panel.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `storage` | permissions | Used to save and synchronize companion preferences (selected character, wander mode, speech toggle, scale, speed, and asleep status) locally on the device and apply them instantly across all open browser tabs. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Distribution

**Visibility**: Public  
**Regions**: All regions  
**Pricing**: Free  

## Developer Info

**Publisher Name**  
The Seeker Developer  

**Contact Email**  
developer@worldisending.com  

**Support URL / Email**  
https://github.com/just2jays/the-seeker/issues  

**Homepage URL**  
http://worldisending.com  

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-11 | Upgraded extension to Manifest V3. Removed jQuery dependency and rewrote core logic in modern Vanilla JS. Added a premium settings popup, size/speed adjustments, wander/mouse toggles, and character speech bubbles. | Draft |

## Review Notes

### Known Issues / Limitations
- Does not inject on browser system pages (e.g. `chrome://` or Chrome Web Store) due to Chrome security restrictions. This is standard behavior for all Chrome Extensions.
