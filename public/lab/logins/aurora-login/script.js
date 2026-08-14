const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entrada em cascata do card ao carregar a página
if (!prefersReducedMotion) {
  gsap.from('.card', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' });
  gsap.from('.field, .submit, .hint', {
    opacity: 0,
    y: 14,
    duration: 0.6,
    stagger: 0.08,
    delay: 0.15,
    ease: 'power2.out'
  });
}

const orbs = gsap.utils.toArray('.orb');

// Flutuação contínua e independente de cada orb (timelines em loop infinito)
if (!prefersReducedMotion) {
  orbs.forEach((orb, i) => {
    gsap.to(orb, {
      x: () => gsap.utils.random(-60, 60),
      y: () => gsap.utils.random(-50, 50),
      duration: gsap.utils.random(6, 10),
      delay: i * 0.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  });
}

// Leve parallax das orbs seguindo o mouse
window.addEventListener('pointermove', (e) => {
  const relX = (e.clientX / window.innerWidth - 0.5) * 2;
  const relY = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const strength = 14 + i * 6;
    gsap.to(orb, {
      xPercent: relX * strength,
      yPercent: relY * strength,
      duration: 1.2,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
});

const form = document.getElementById('login-form');
const submit = form.querySelector('.submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email;
  const password = form.password;

  const emailValid = email.value.trim().length > 3 && email.value.includes('@');
  const passwordValid = password.value.length >= 6;

  [ [email, emailValid], [password, passwordValid] ].forEach(([input, valid]) => {
    const field = input.closest('.field');
    field.classList.toggle('invalid', !valid);
    if (!valid) {
      gsap.fromTo(field,
        { x: -6 },
        { x: 0, duration: 0.45, ease: 'elastic.out(1, 0.3)' }
      );
    }
  });

  if (!emailValid || !passwordValid) return;

  submit.classList.add('loading');
  submit.disabled = true;

  // Simula chamada de rede para demonstrar o estado de loading
  setTimeout(() => {
    submit.classList.remove('loading');
    submit.disabled = false;
    gsap.fromTo(submit,
      { scale: 1 },
      { scale: 1.04, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }
    );
  }, 1600);
});
