/**
 * countdown.js
 * Counts down to the unlock date defined in config.js
 */

(function () {
    // Read from CONFIG or fallback
    const isoDate = (window.BIRTHDAY_CONFIG && window.BIRTHDAY_CONFIG.unlockDateIso)
        ? window.BIRTHDAY_CONFIG.unlockDateIso
        : "2025-12-27T18:00:00";

    const TARGET_DATE = new Date(isoDate).getTime();
    const timerElement = document.getElementById('countdown-timer');

    function updateTimer() {
        if (!timerElement) return;

        const now = new Date().getTime();
        const distance = TARGET_DATE - now;

        if (distance < 0) {
            timerElement.innerHTML = `<span class="text-gold-400 font-serif text-2xl tracking-widest uppercase">Event Unlocked</span>`;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `
            <div class="flex gap-4 justify-center text-center">
                <div class="flex flex-col"><span class="text-4xl font-serif text-gold-400">${days}</span><span class="text-xs uppercase tracking-widest opacity-70">Days</span></div>
                <div class="flex flex-col"><span class="text-4xl font-serif text-gold-400">${hours}</span><span class="text-xs uppercase tracking-widest opacity-70">Hrs</span></div>
                <div class="flex flex-col"><span class="text-4xl font-serif text-gold-400">${minutes}</span><span class="text-xs uppercase tracking-widest opacity-70">Min</span></div>
                <div class="flex flex-col"><span class="text-4xl font-serif text-gold-400">${seconds}</span><span class="text-xs uppercase tracking-widest opacity-70">Sec</span></div>
            </div>
        `;
    }

    if (timerElement) {
        setInterval(updateTimer, 1000);
        updateTimer();
    }
})();
