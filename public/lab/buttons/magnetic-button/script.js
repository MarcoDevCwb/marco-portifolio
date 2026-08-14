const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.from('.hint', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' });
  gsap.from('.magnetic', {
    opacity: 0,
    y: 20,
    scale: 0.92,
    duration: 0.6,
    stagger: 0.1,
    delay: 0.1,
    ease: 'back.out(1.7)'
  });
}

document.querySelectorAll('.magnetic').forEach((btn) => {
  const strength = Number(btn.dataset.strength) || 30;

  const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
  const scaleTo = gsap.quickTo(btn, 'scale', { duration: 0.3, ease: 'power2.out' });

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    xTo((relX / rect.width) * strength);
    yTo((relY / rect.height) * strength);
  });

  btn.addEventListener('mouseenter', () => scaleTo(1.06));

  btn.addEventListener('mouseleave', () => {
    xTo(0);
    yTo(0);
    scaleTo(1);
  });

  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
