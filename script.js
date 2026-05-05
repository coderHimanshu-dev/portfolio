/* ── THEME TOGGLE ──────────────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themes = { dark: { icon: '☀', next: 'light' }, light: { icon: '☾', next: 'dark' } };
themeBtn.addEventListener('click', () => {
  const current = html.dataset.theme;
  const { icon, next } = themes[current];
  html.dataset.theme = next;
  themeBtn.textContent = icon;
});

/* ── NAVBAR SCROLL ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── HAMBURGER ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── REVEAL ON SCROLL ──────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── CONTACT FORM ──────────────────────────────────── */
function submitContactForm() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const errBox = document.getElementById('cf-error');
  const btn = document.getElementById('cf-submit');
  const btnText = document.getElementById('cf-btn-text');

  // Validation
  if (!name || !email || !message) {
    errBox.textContent = 'Please fill in Name, Email, and Message.';
    errBox.style.display = 'block';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errBox.textContent = 'Please enter a valid email address.';
    errBox.style.display = 'block';
    return;
  }
  errBox.style.display = 'none';

  // Simulate sending — opens mailto as fallback
  btn.disabled = true;
  btnText.textContent = 'Sending…';

  const mailSubject = encodeURIComponent(subject || 'Message from ' + name);
  const mailBody = encodeURIComponent(
    'Hi Himanshu,\n\n' + message + '\n\n— ' + name + '\n' + email
  );
  const mailtoLink = `mailto:himanshuvarma8881@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  setTimeout(() => {
    window.location.href = mailtoLink;
    btn.disabled = false;
    btnText.textContent = 'Send Message';
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'flex';
  }, 800);
}

function resetForm() {
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-subject').value = '';
  document.getElementById('cf-message').value = '';
  document.getElementById('contactForm').style.display = 'flex';
  document.getElementById('formSuccess').style.display = 'none';
}
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));
