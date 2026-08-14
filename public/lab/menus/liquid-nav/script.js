const nav = document.querySelector('.liquid-nav');
const links = document.querySelectorAll('.links a');
const blob = document.querySelector('.blob');

function moveBlobTo(el) {
  const linkRect = el.getBoundingClientRect();
  const listRect = el.closest('.links').getBoundingClientRect();

  gsap.to(blob, {
    x: linkRect.left - listRect.left,
    width: linkRect.width,
    opacity: 1,
    duration: 0.55,
    ease: 'elastic.out(1, 0.65)'
  });
}

const activeLink = document.querySelector('.links a.active');
if (activeLink) {
  requestAnimationFrame(() => moveBlobTo(activeLink));
}

links.forEach(link => {
  link.addEventListener('mouseenter', () => moveBlobTo(link));
});

document.querySelector('.links').addEventListener('mouseleave', () => {
  const target = document.querySelector('.links a.active');
  if (target) moveBlobTo(target);
});

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    moveBlobTo(link);
    closeMenu();
  });
});

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

window.addEventListener('resize', () => {
  const target = document.querySelector('.links a.active');
  if (target) moveBlobTo(target);
  if (window.innerWidth > 640) closeMenu();
});

const hamburger = document.getElementById('hamburger');

function closeMenu() {
  nav.classList.remove('nav-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.panel').forEach((panel) => {
    const targets = panel.querySelectorAll('h1, h2, p');

    gsap.from(targets, {
      opacity: 0,
      y: 36,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: panel,
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}
