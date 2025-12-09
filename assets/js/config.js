/**
 * config.js
 * CENTRAL CONFIGURATION FILE
 * Edit this file to update your event details, secrets, and settings.
 */

const BIRTHDAY_CONFIG = {
    // 1. EVENT DETAILS
    eventName: "Private Royal Birthday", // Used for dynamic titles if implemented
    eventDate: "December 27",            // Display text
    unlockDateIso: "2025-12-27T18:00:00", // EXACT DATE/TIME to unlock location (ISO Format)

    // 2. GUEST & RSVP SETTINGS
    maxSlots: 50, // Total number of guests allowed
    rsvpEndpoint: "https://getform.io/f/example-endpoint", // REPLACE with your actual Getform/Formspree URL

    // 3. SECURITY & ACCESS
    // Use the console to generate hashes: await sha256("YOUR_CODE")
    // By default, this includes hash for "royalty25"
    masterAccessCodeHashes: [
        "b822f185794da8795eb9d042f4c3298c9f0b3457223e74284cf635c24a66bd2f"
    ],

    // 4. LOCATION REVEAL
    // Hashes of the 10 unique guest codes + Master code that can unlock the location page
    guestCodeHashes: [
        // Paste your 10 generated guest code hashes here
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
