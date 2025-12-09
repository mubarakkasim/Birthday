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
    : ["48a9e10ee495266ffa0a28cb517339b748fa69f913b10ea49e1e3b0c9471c3d5"]; // Fallback to "royalty25"

const accessInput = document.getElementById('access-code-input');
const unlockBtn = document.getElementById('unlock-btn');
const errorMsg = document.getElementById('error-msg');

if (unlockBtn && accessInput) {
    unlockBtn.addEventListener('click', async () => {
        // ENFORCE LOWERCASE for user friendliness
        const inputVal = accessInput.value.trim().toLowerCase();
        console.log("Debug: Checking access for:", inputVal);

        if (!inputVal) return;

        unlockBtn.innerText = "Checking...";
        unlockBtn.disabled = true;

        try {
            const hash = await sha256(inputVal);
            console.log("Debug: Hash:", hash);

            if (validHashes.includes(hash)) {
                // Success
                sessionStorage.setItem('birthday_access_unlocked', 'true');
                sessionStorage.setItem('birthday_access_code', inputVal);
                window.location.href = 'invite.html';
            } else {
                // Fail
                if (errorMsg) {
                    errorMsg.innerText = "Invalid Access Code (Try 'royalty25')";
                    errorMsg.classList.remove('hidden');
                    setTimeout(() => errorMsg.classList.add('hidden'), 3000);
                }
                unlockBtn.innerText = "Unlock";
                unlockBtn.disabled = false;
            }
        } catch (e) {
            console.error(e);
            alert("Error checking code. Ensure you are on HTTPS or localhost.");
            unlockBtn.innerText = "Unlock";
            unlockBtn.disabled = false;
        }
    });
}

const toggleBtn = document.getElementById('toggle-visibility');
const eyeOpen = document.getElementById('eye-icon-open');
const eyeClosed = document.getElementById('eye-icon-closed');

if (toggleBtn && accessInput) {
    toggleBtn.addEventListener('click', () => {
        const isPassword = accessInput.type === 'password';
        accessInput.type = isPassword ? 'text' : 'password';

        if (eyeOpen && eyeClosed) {
            eyeOpen.classList.toggle('hidden');
            eyeClosed.classList.toggle('hidden');
        }
    });
}

function enforceAccess() {
    if (!sessionStorage.getItem('birthday_access_unlocked')) {
        window.location.href = 'index.html';
    }
}
