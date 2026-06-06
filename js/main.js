/* ===========================
   Header scroll effect
   =========================== */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===========================
   Mobile menu
   =========================== */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

/* ===========================
   Scroll reveal
   =========================== */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  revealEls.forEach(el => io.observe(el));
}

/* ===========================
   Contact form
   =========================== */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const success = document.querySelector('.form-success');
    const check = form.querySelector('#privacy-check');

    if (!check.checked) {
      alert('プライバシーポリシーへの同意をお願いします。');
      return;
    }

    btn.disabled = true;
    btn.textContent = '送信中…';

    /* TODO: Formspreeのエンドポイントに差し替えてください
       const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
         method: 'POST',
         body: new FormData(form),
         headers: { Accept: 'application/json' }
       });
       if (!res.ok) throw new Error();
    */

    /* デモ用: 1秒後に成功表示 */
    await new Promise(r => setTimeout(r, 1000));

    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}
