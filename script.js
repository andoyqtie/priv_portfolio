/* ============================================================
   PRIV — PORTFOLIO SCRIPT
   script.js
   ============================================================ */

/* ── SCROLL-REVEAL (IntersectionObserver) ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── MOBILE NAV TOGGLE ── */
function toggleNav(btn) {
  const links = document.querySelector('.nav-links');
  const cta   = document.querySelector('.nav-cta');
  const isOpen = links.style.display === 'flex';

  if (isOpen) {
    links.style.cssText = '';
    cta.style.display   = '';
    btn.children[0].style.transform = '';
    btn.children[1].style.opacity   = '1';
    btn.children[2].style.transform = '';
  } else {
    links.style.cssText = [
      'display:flex',
      'flex-direction:column',
      'position:fixed',
      'top:60px',
      'left:0',
      'right:0',
      'background:rgba(13,17,23,0.97)',
      'backdrop-filter:blur(14px)',
      'padding:2rem',
      'gap:1.5rem',
      'border-bottom:1px solid #21282f',
      'z-index:99',
    ].join(';');
    cta.style.display = 'none';
    btn.children[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    btn.children[1].style.opacity   = '0';
    btn.children[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  }
}

/* Close mobile nav when a link is tapped */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const btn   = document.querySelector('.hamburger');
    links.style.cssText             = '';
    btn.children[0].style.transform = '';
    btn.children[1].style.opacity   = '1';
    btn.children[2].style.transform = '';
    document.querySelector('.nav-cta').style.display = '';
  });
});

/* ── ACTIVE NAV HIGHLIGHT ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── GRACEFUL IMAGE FALLBACK ──
   If an image file is missing, hides <img> and shows the emoji placeholder.  */
document.querySelectorAll('img[data-fallback]').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = img.closest('[data-placeholder-parent]')
      ?.querySelector('.achieve-img-placeholder, .project-thumb-placeholder');
    if (placeholder) placeholder.style.display = 'flex';
  });
});
