/**
 * config.js
 * CENTRAL CONFIGURATION FILE
 * Edit this file to update your event details, secrets, and settings.
 */

const BIRTHDAY_CONFIG = {
    // 1. EVENT DETAILS
    eventName: "Private Royal Birthday",
    eventDate: "December 27",
    unlockDateIso: "2025-12-27T18:00:00",

    // 2. GUEST & RSVP SETTINGS
    maxSlots: 10,
    rsvpEndpoint: "https://getform.io/f/example-endpoint",

    // 3. SECURITY & ACCESS
    // Hashes for valid access codes:
    masterAccessCodeHashes: [
        "48a9e10ee495266ffa0a28cb517339b748fa69f913b10ea49e1e3b0c9471c3d5", // royalty25
        "280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02", // welcome
        "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"   // 1234
    ],

    // 4. LOCATION REVEAL
    guestCodeHashes: [
        // Example: sha256("ROYALTY25-1234")
    ],

    // 5. SECRETS (Displayed only when unlocked)
    hotelName: "The Grand Palace Hotel",
    hotelAddress: "123 Royal Avenue, District 1",

    // 6. BANKING (For Admin/Manual Use)
    bankDetails: {
        bankName: "Royal Bank",
        accountNum: "1234567890",
        accountName: "Birthday Host"
    }
};

// Make it global
window.BIRTHDAY_CONFIG = BIRTHDAY_CONFIG;
