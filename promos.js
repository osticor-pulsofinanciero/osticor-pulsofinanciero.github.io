/* ============================================================================
   PROMOS.JS - Lógica de reproductores verticales y fondos decorados
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ================= 1. INYECTAR FONDOS DECORADOS ================= */
    // Busca las secciones con fondo blanco/gris claro y les añade círculos de color
    const sectionsToDecorate = document.querySelectorAll('.bg-light');
    sectionsToDecorate.forEach(section => {
        section.classList.add('decorated-section');
        const c1 = document.createElement('div');
        c1.className = 'decor-circle circle-1';
        const c2 = document.createElement('div');
        c2.className = 'decor-circle circle-2';
        const c3 = document.createElement('div');
        c3.className = 'decor-circle circle-3';
        section.appendChild(c1);
        section.appendChild(c2);
        section.appendChild(c3);
    });

    /* ================= 2. LÓGICA DE REPRODUCTORES VERTICALES ================= */
    function initVerticalVideo(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scenes = container.querySelectorAll('.v-scene');
        const progressFill = container.querySelector('.v-progress-fill');
        const btnPlayPause = container.querySelector('.v-btn-play');
        const overlay = container.querySelector('.v-play-overlay');
        const btnBigPlay = container.querySelector('.v-play-btn');
        const progressBar = container.querySelector('.v-progress');

        if (scenes.length === 0) return;

        const SCENE_DURATION = 3000; // 3 segundos por escena
        const TOTAL_DURATION = scenes.length * SCENE_DURATION;

        let currentScene = 0;
        let isPlaying = false;
        let startTime = 0;
        let pausedAt = 0;
        let rafId = null;

        function goToScene(index) {
            if (index === currentScene) return;
            currentScene = index;
            scenes.forEach((s, i) => s.classList.toggle('active', i === index));
        }

        function updateProgress(elapsed) {
            const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
            progressFill.style.width = pct + '%';
        }

        function tick() {
            if (!isPlaying) return;
            const now = performance.now();
            const elapsed = now - startTime + pausedAt;

            if (elapsed >= TOTAL_DURATION) {
                updateProgress(TOTAL_DURATION);
                stop();
                return;
            }

            const sceneIndex = Math.min(scenes.length - 1, Math.floor(elapsed / SCENE_DURATION));
            if (sceneIndex !== currentScene) goToScene(sceneIndex);

            updateProgress(elapsed);
            rafId = requestAnimationFrame(tick);
        }

        function play() {
            if (isPlaying) return;
            if (pausedAt >= TOTAL_DURATION) {
                pausedAt = 0;
                currentScene = -1;
                goToScene(0);
            }
            isPlaying = true;
            startTime = performance.now();
            btnPlayPause.textContent = '⏸';
            overlay.classList.add('hidden');
            rafId = requestAnimationFrame(tick);
        }

        function pause() {
            if (!isPlaying) return;
            isPlaying = false;
            pausedAt += performance.now() - startTime;
            btnPlayPause.textContent = '▶';
            if (rafId) cancelAnimationFrame(rafId);
        }

        function stop() {
            isPlaying = false;
            pausedAt = TOTAL_DURATION;
            btnPlayPause.textContent = '▶';
            if (rafId) cancelAnimationFrame(rafId);
        }

        btnPlayPause.addEventListener('click', () => isPlaying ? pause() : play());
        overlay.addEventListener('click', play);
        btnBigPlay.addEventListener('click', (e) => { e.stopPropagation(); play(); });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            const targetMs = pct * TOTAL_DURATION;
            const sceneIndex = Math.min(scenes.length - 1, Math.floor(targetMs / SCENE_DURATION));

            if (rafId) cancelAnimationFrame(rafId);
            isPlaying = false;
            pausedAt = targetMs;
            currentScene = -1;
            goToScene(sceneIndex);
            updateProgress(pausedAt);
            btnPlayPause.textContent = '▶';
        });

        // Auto-play cuando entra en pantalla
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isPlaying && pausedAt === 0) {
                        play();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(container);
        }
    }

    // Inicializar ambos reproductores
    initVerticalVideo('videoOstikec');
    initVerticalVideo('videoKontaFin');
});