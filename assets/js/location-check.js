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
    ? window.BIRTHDAY_CONFIG.guestCodeHashes
    : [];

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
}

if (revealBtn) {
    revealBtn.addEventListener('click', async () => {
        const inputVal = codeInput.value.trim().toUpperCase();
        if (!inputVal) return;

        const hash = await sha256(inputVal);

        let isValid = false;
        if (VALID_GUEST_CODES_HASHES.includes(hash)) {
            isValid = true;
        }

        // Also check if master code used for access is valid (optional fallback)
        const masterMethod = sessionStorage.getItem('birthday_access_code');
        // if (inputVal === masterMethod) isValid = true;

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
