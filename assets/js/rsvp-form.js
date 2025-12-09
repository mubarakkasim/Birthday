/**
 * rsvp-form.js
 * Handles form submission to external provider, generates guest passes.
 * Uses config.js for endpoints and slot limits.
 */

// LOAD CONFIG
const FORM_ENDPOINT = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.rsvpEndpoint)
    ? window.BIRTHDAY_CONFIG.rsvpEndpoint
    : "";
const MAX_SLOTS = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.maxSlots)
    ? window.BIRTHDAY_CONFIG.maxSlots
    : 50;

const rsvpForm = document.getElementById('rsvp-form');
const slotsDisplay = document.getElementById('slots-display');

async function checkSlots() {
    if (!slotsDisplay) return;
    // Simulated slots taken
    const taken = 12;
    const left = MAX_SLOTS - taken;
    slotsDisplay.innerText = `${left} spots remaining`;
}

checkSlots();

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Registering...";
        submitBtn.disabled = true;

        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // If endpoint is set, try to post (commented out for safety/demo)
            /*
            if(FORM_ENDPOINT) {
                 await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: {'Accept': 'application/json'}
                });
            }
            */

            // SIMULATE DELAY
            await new Promise(r => setTimeout(r, 1500));

            handleRegistrationSuccess(data);

        } catch (error) {
            alert("There was a problem registering.");
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}

function handleRegistrationSuccess(data) {
    const baseCode = sessionStorage.getItem('birthday_access_code') || "GUEST";
    const uniqueSuffix = Date.now().toString().slice(-4);
    const guestCode = `${baseCode}-${uniqueSuffix}`.toUpperCase();

    const guestData = {
        name: data.name,
        code: guestCode,
        registeredAt: new Date().toISOString()
    };
    localStorage.setItem('birthday_guest_pass', JSON.stringify(guestData));

    document.getElementById('rsvp-section').classList.add('hidden');
    const successCard = document.getElementById('success-card');
    successCard.classList.remove('hidden');

    document.getElementById('guest-name-display').innerText = data.name;
    document.getElementById('guest-code-display').innerText = guestCode;

    if (window.generateQR) {
        window.generateQR(document.getElementById('qr-container'), guestCode);
    }

    const printBtn = document.getElementById('download-pass-btn');
    printBtn.onclick = () => {
        window.open(`print.html?code=${guestCode}&name=${encodeURIComponent(data.name)}`, '_blank');
    };
}
