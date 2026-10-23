// Kebe Design Web · script commun à toutes les pages

// Menu burger (mobile)
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
function toggleMenu() {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
}
burger.addEventListener('click', toggleMenu);
burger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
});

// Apparition au défilement
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in, .page-banner').forEach(el => observer.observe(el));

// Effet de survol sur les cartes
document.querySelectorAll('.skill-domain, .home-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    card.style.transform = `perspective(800px) rotateY(${x / 40}deg) rotateX(${-y / 40}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Formulaire de contact : ouvre la messagerie avec le message prêt
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.getElementById('form-note');
    if (!form.checkValidity()) {
      note.textContent = 'Merci de remplir tous les champs avec une adresse e-mail valide.';
      note.className = 'form-note error';
      return;
    }
    note.textContent = "Votre messagerie s'ouvre avec le message prêt à envoyer.";
    note.className = 'form-note ok';
    const body = `${form.message.value}\n\n${form.nom.value} (${form.email.value})`;
    window.location.href = `mailto:fkebe0846@gmail.com?subject=${encodeURIComponent(form.sujet.value)}&body=${encodeURIComponent(body)}`;
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
