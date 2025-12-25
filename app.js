import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

// Initialize Mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral', // Better for visibility on white background in the sandbox
    securityLevel: 'strict',
});

const input = document.getElementById('mermaid-input');
const output = document.getElementById('mermaid-output');

let timeout;

async function renderDiagram() {
    const code = input.value.trim();
    if (!code) {
        output.innerHTML = '<span class="text-gray-400 italic">Enter Mermaid code to preview...</span>';
        return;
    }

    try {
        const { svg } = await mermaid.render('preview-diagram', code);
        output.innerHTML = svg;
    } catch (err) {
        console.error('Mermaid Render Error:', err);
        // We don't want to break the UI on every typing error
        // Just show a small indication if it's been invalid for a while
    }
}

input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(renderDiagram, 500);
});

// Initial render
window.addEventListener('DOMContentLoaded', () => {
    renderDiagram();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple observer for reveal animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(card => {
        card.classList.add('transition', 'duration-700', 'transform', 'opacity-0', 'translate-y-10');
        observer.observe(card);
    });
});