/**
 * access-check.js
 * Handles access code validation using client-side hashing and CONFIG.
 */

// UTILITY: Compute SHA-256 hash of a string
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// CONFIG
const validHashes = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.masterAccessCodeHashes)
    ? window.BIRTHDAY_CONFIG.masterAccessCodeHashes
    : ["b822f185794da8795eb9d042f4c3298c9f0b3457223e74284cf635c24a66bd2f"]; // Fallback to "royalty25"

const accessInput = document.getElementById('access-code-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-msg');

if (unlockBtn && accessInput) {
    unlockBtn.addEventListener('click', async () => {
        const inputVal = accessInput.value.trim();
        if (!inputVal) return;

        unlockBtn.innerText = "Checking...";
        unlockBtn.disabled = true;

        try {
            const hash = await sha256(inputVal);
            if (validHashes.includes(hash)) {
                // Success
                sessionStorage.setItem('birthday_access_unlocked', 'true');
                sessionStorage.setItem('birthday_access_code', inputVal);
                window.location.href = 'invite.html';
            } else {
                // Fail
                errorMsg.classList.remove('hidden');
                setTimeout(() => errorMsg.classList.add('hidden'), 3000);
                unlockBtn.innerText = "Unlock";
                unlockBtn.disabled = false;
            }
        } catch (e) {
            console.error(e);
            alert("Error checking code.");
            unlockBtn.innerText = "Unlock";
            unlockBtn.disabled = false;
        }
    });
}

function enforceAccess() {
    if (!sessionStorage.getItem('birthday_access_unlocked')) {
        window.location.href = 'index.html';
    }
}
