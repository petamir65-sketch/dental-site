// Header state on scroll
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  nav.classList.toggle('is-open');
});
nav.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    burger.classList.remove('is-active');
    nav.classList.remove('is-open');
  })
);

// Phone mask (light)
document.querySelectorAll('input[type="tel"]').forEach(input => {
  input.addEventListener('input', () => {
    let d = input.value.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    let out = '+7';
    if (d.length > 1) out += ' (' + d.slice(1, 4);
    if (d.length >= 4) out += ')';
    if (d.length > 4) out += ' ' + d.slice(4, 7);
    if (d.length > 7) out += '-' + d.slice(7, 9);
    if (d.length > 9) out += '-' + d.slice(9, 11);
    input.value = out;
  });
});

// Quick booking form (hero)
const miniForm = document.getElementById('miniForm');
const miniSuccess = document.getElementById('miniSuccess');
miniForm.addEventListener('submit', e => {
  e.preventDefault();
  const phone = miniForm.phone;
  const digits = phone.value.replace(/\D/g, '').length;
  if (digits < 11) {
    phone.classList.add('is-invalid');
    return;
  }
  phone.classList.remove('is-invalid');
  miniSuccess.classList.add('is-visible');
  miniForm.reset();
  setTimeout(() => miniSuccess.classList.remove('is-visible'), 6000);
});

// Lead form
const form = document.getElementById('leadForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name;
  const phone = form.phone;
  let valid = true;

  [name, phone].forEach(input => {
    const bad = !input.value.trim() || input.value.replace(/\D/g, '').length < 11;
    input.classList.toggle('is-invalid', bad);
    if (bad) valid = false;
  });

  if (!valid) return;

  success.classList.add('is-visible');
  form.reset();
  setTimeout(() => success.classList.remove('is-visible'), 6000);
});

// Reveal on scroll
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
