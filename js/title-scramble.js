(function () {
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const TICK_MS = 30;

    function scramble(el) {
        if (el._scrambleInterval) clearInterval(el._scrambleInterval);

        const target = el.dataset.text || el.textContent;
        let iteration = 0;

        el._scrambleInterval = setInterval(() => {
            el.textContent = target
                .split('')
                .map((ch, index) => {
                    if (ch === ' ') return ' ';
                    if (index < iteration) return target[index];
                    return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                })
                .join('');

            if (iteration >= target.length) {
                clearInterval(el._scrambleInterval);
                el.textContent = target;
            }

            iteration += 1 / 3;
        }, TICK_MS);
    }

    function init() {
        const title = document.getElementById('title');
        if (!title) return;
        if (!title.dataset.text) title.dataset.text = title.textContent;

        title.addEventListener('mouseenter', () => scramble(title));

        // The title sits inside #everything-else, which loading.js keeps hidden behind the
        // loading screen until window "load" fires (then fades it out, waits ~100ms, and
        // fades #everything-else in over 500ms) -- scrambling any earlier would run on a
        // hidden element and never be seen, so match that timing instead of DOMContentLoaded.
        window.addEventListener('load', () => {
            setTimeout(() => scramble(title), 450);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
