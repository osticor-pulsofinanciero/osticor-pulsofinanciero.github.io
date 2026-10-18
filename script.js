/* =====================================================
   OSTICOR Pulso Financiero - Lógica del Sitio
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= MENÚ MÓVIL ================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* ================= ANIMACIONES AL HACER SCROLL ================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Para elementos que ya están visibles al cargar

    /* ================= FORMULARIO DE CONTACTO ================= */
    const form = document.getElementById('formulario-contacto');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulación de envío de datos
        formStatus.textContent = 'Enviando mensaje...';
        formStatus.style.color = '#2a5280';

        setTimeout(() => {
            formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            formStatus.style.color = '#2e7d32'; // Verde de KontaFin/OSTIKEC
            form.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1500);
    });

    /* ================= HEADER SCROLL EFFECT ================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'var(--azul-oscuro)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'var(--azul-medio)';
        }
    });
});