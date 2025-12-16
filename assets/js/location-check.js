/**
 * location-check.js
 * Unlocks the location details if Date is reached AND Code is valid.
 * Uses config.js for dates and secrets.
 */

// CONFIG
const UNLOCK_DATE = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.unlockDateIso)
    ? new Date(window.BIRTHDAY_CONFIG.unlockDateIso).getTime()
    : new Date("2025-12-27T18:00:00").getTime();

const VALID_GUEST_CODES_HASHES = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.guestCodeHashes)
const urlParams = new URLSearchParams(window.location.search);
const urlCode = urlParams.get('code');

const locationLocked = document.getElementById('location-locked');
const locationUnlocked = document.getElementById('location-unlocked');
const timerMsg = document.getElementById('timer-msg');
const codeInput = document.getElementById('reveal-code-input');
const revealBtn = document.getElementById('reveal-btn');
const hotalNameEl = document.getElementById('secret-hotel-name');
const hotelAddressEl = document.getElementById('secret-hotel-address');

async function checkReveal() {
    const now = new Date().getTime();
    if (now < UNLOCK_DATE) {
        if (timerMsg) timerMsg.innerText = "Event has not started yet.";
        return;
    }
    if (timerMsg) timerMsg.innerText = "Event is live. Enter your unique code.";
    if (revealBtn) revealBtn.disabled = false;

    // Auto-check if URL code is present
    if (urlCode && codeInput) {
        codeInput.value = urlCode;
        // Small delay to ensure UI updates
        setTimeout(() => {
            if (revealBtn) revealBtn.click();
        }, 500);
    }
}

if (revealBtn) {
    revealBtn.addEventListener('click', async () => {
        const inputVal = codeInput.value.trim(); // Case sensitive or not? Usually hashes are lower/case sensitive. Let's try flexible.
        if (!inputVal) return;

        // Try both raw and uppercase for user convenience, but usually config hashes need to match exactly or normalized.
        // We'll normalize input to what the hash expects. Assuming the config hashes are for specific strings.
        // For security, usually precise. But for this event, we'll try the input as is.
        const hash = await sha256(inputVal);

        // Also try lowercase hash since config hashes might be of lowercased strings
        const lowerHash = await sha256(inputVal.toLowerCase());

        let isValid = false;

        // Check Guest Codes
        if (VALID_GUEST_CODES_HASHES.includes(hash) || VALID_GUEST_CODES_HASHES.includes(lowerHash)) {
            isValid = true;
        }

        // Check Master Codes (Fallback)
        const MASTER_HASHES = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.masterAccessCodeHashes)
            ? window.BIRTHDAY_CONFIG.masterAccessCodeHashes
            : [];

        if (MASTER_HASHES.includes(hash) || MASTER_HASHES.includes(lowerHash)) {
            isValid = true;
        }

        if (isValid) {
            // Apply config details to DOM before showing
            if (window.BIRTHDAY_CONFIG && hotalNameEl) hotalNameEl.innerText = window.BIRTHDAY_CONFIG.hotelName;
            if (window.BIRTHDAY_CONFIG && hotelAddressEl) hotelAddressEl.innerText = window.BIRTHDAY_CONFIG.hotelAddress;

            locationLocked.classList.add('hidden');
            locationUnlocked.classList.remove('hidden');
        } else {
            alert("Invalid code or location still locked.");
        }
    });
}

// Redefine sha256 here if access-check.js isn't loaded
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

checkReveal();
