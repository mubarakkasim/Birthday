/**
 * qr-gen.js
 * Wrapper for generating QR codes.
 * Requires: qrcode.js (loaded via CDN in HTML)
 */

window.generateQR = function (element, text) {
    if (!element) return;
    element.innerHTML = ""; // Clear previous

    try {
        new QRCode(element, {
            text: text,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (e) {
        console.error("QR Library not loaded", e);
        element.innerText = "QR Error";
    }
};
