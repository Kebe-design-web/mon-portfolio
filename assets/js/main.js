/* =========================================================
   Kebe Design Web · scripts communs
   1. Menu mobile
   2. Année automatique dans le pied de page
   3. Filtres de la page Projets
   4. Validation du formulaire de contact
   ========================================================= */
(function () {
  'use strict';

  /* 1. Menu mobile : ouvre et ferme la navigation sur petit écran */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* 2. Année du copyright */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* 3. Filtres des projets (data-cat sur chaque carte) */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('[data-cat]');
  var empty = document.getElementById('projects-empty');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      var visible = 0;
      projects.forEach(function (p) {
        var show = cat === 'all' || p.getAttribute('data-cat').split(' ').indexOf(cat) !== -1;
        p.hidden = !show;
        if (show) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });

  /* 4. Formulaire de contact
     Aucun serveur n'est branché : après validation, le message est
     préparé dans le logiciel de messagerie du visiteur (mailto).
     Pour un envoi direct, remplacer ce bloc par un service de formulaire
     (Formspree, Getform...) et mettre son URL dans l'attribut action. */
  var form = document.getElementById('contact-form');
  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var check = function (field) {
      var wrap = field.closest('.field');
      var ok = field.value.trim().length > 0;
      if (ok && field.type === 'email') ok = emailRe.test(field.value.trim());
      if (ok && field.name === 'message') ok = field.value.trim().length >= 10;
      wrap.classList.toggle('invalid', !ok);
      field.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    };
    form.querySelectorAll('input[required], textarea[required]').forEach(function (f) {
      f.addEventListener('blur', function () { check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('input[required], textarea[required]');
      var allOk = true, firstBad = null;
      fields.forEach(function (f) { if (!check(f)) { allOk = false; firstBad = firstBad || f; } });
      var status = document.getElementById('form-status');
      if (!allOk) { firstBad.focus(); return; }
      var name = form.elements.name.value.trim();
      var mail = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim();
      var body = form.elements.message.value.trim() + '\n\n' + name + ' (' + mail + ')';
      window.location.href = 'mailto:fkebe0846@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      status.textContent = "Votre logiciel de messagerie s'ouvre avec le message prêt. Cliquez sur Envoyer pour me l'adresser.";
      status.classList.add('show');
    });
  }
})();
