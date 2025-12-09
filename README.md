# Private Royal Birthday Site

A static, secure-ish, private event website built with HTML, Tailwind CSS, and Vanilla JS. Designed for easy updates via a single config file.

## 🚀 Quick Start (Vercel)

1. **Upload**: Drag `Birthday` folder to Vercel Dashboard.
2. **Deploy**: It will auto-detect as a static site.
3. **Domain**: Connect your custom domain.

## 🛠 Configuration (NEW: Centralized)

We've made it much easier to update event details. 
**You only need to edit ONE file for most changes.**

### 1. Open `assets/js/config.js`
This file contains all the settings. 
- **unlockDateIso**: The exact date/time the location reveals.
- **eventDate**: The display text for the date.
- **hotelName / hotelAddress**: The secret location details (reveals only when unlocked).
- **maxSlots**: Total guest count.
- **rsvpEndpoint**: Your Getform/Google Forms URL.
- **masterAccessCodeHashes**: The hashed password for the site.
- **guestCodeHashes**: The 10 hashed unique codes for guests.

### 2. How to Generate Hashes
To keep your secrets safe (e.g. Hotel Name is hidden in JS, but codes are hashed), you need to generate hashes for your access codes.
1. Open the site in Chrome/Safari.
2. Right-click anywhere > **Inspect** > **Console**.
3. Type: `await sha256("mypassword")`
4. Copy the long string it spits out.
5. Paste that string into `assets/js/config.js` in the `masterAccessCodeHashes` list.

### 3. Setting up RSVP
1. Create a form on [Getform.io](https://getform.io) (Free) or Google Forms.
2. Copy the "Endpoint" URL.
3. Paste it into `assets/js/config.js` at `rsvpEndpoint`.
4. The form will now post data there.

### 4. Private Payments (Admin)
- **File**: `admin-paylinks.html` (Manual edit required)
- Open this file in a text editor.
- Manually replace the `{{BANK_DETAILS}}` blocks with your real info.
- This page is **HTML-only** and not linked anywhere. Keep the URL secret.

## 📁 File Config Summary
- `assets/js/config.js`: **EDIT THIS FIRST** (Dates, Names, Secrets).
- `index.html`: Landing page text (Edit manually if "Royal Birthday" text changes).
- `admin-paylinks.html`: Payment info (Manual edit).

## ✅ Final Check
- [ ] Edited `config.js` with real Date and Hotel Name?
- [ ] Swapped the "royalty25" hash with your own?
- [ ] Added RSVP Endpoint?

Project ready for Vercel.
