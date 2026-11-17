// Enamel Dental Studio: site behaviour
(function () {
  'use strict';

  /* ------------------------------------------------------------------
   * GO-LIVE SETTINGS
   * FORM_ENDPOINT: URL that accepts a JSON POST (Formspree, Web3Forms,
   *   Getform, your own API). Leave empty to use WhatsApp instead.
   * WHATSAPP_NUMBER: clinic WhatsApp number, digits only with country
   *   code (e.g. 919876543210). Used when FORM_ENDPOINT is empty.
   * ------------------------------------------------------------------ */
  var FORM_ENDPOINT = '';
  var WHATSAPP_NUMBER = '918055500142';

  /* Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Mobile menu */
  var nav = document.getElementById('siteNav');
  var toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    toggle.hidden = false;
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* Booking form */
  var form = document.getElementById('bookForm');
  if (!form) return;
  var done = document.getElementById('formDone');
  var doneTitle = document.getElementById('doneTitle');
  var doneText = document.getElementById('doneText');
  var note = document.getElementById('formNote');
  var submit = document.getElementById('formSubmit');
  var dateInput = document.getElementById('f-date');
  var treatSelect = document.getElementById('f-treat');
  var defaultNote = note.textContent;

  // Earliest date is today, in the visitor's local time
  var now = new Date();
  dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // Treatment tiles preselect the matching option in the form
  document.querySelectorAll('[data-treatment]').forEach(function (link) {
    link.addEventListener('click', function () {
      var want = link.getAttribute('data-treatment');
      for (var i = 0; i < treatSelect.options.length; i++) {
        if (treatSelect.options[i].text === want) { treatSelect.selectedIndex = i; break; }
      }
    });
  });

  function showError(field, message) {
    note.textContent = message;
    note.classList.add('is-error');
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', 'formNote');
      field.focus();
    }
  }

  function clearErrors() {
    note.textContent = defaultNote;
    note.classList.remove('is-error');
    form.querySelectorAll('[aria-invalid]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
      el.removeAttribute('aria-describedby');
    });
  }

  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid')) clearErrors();
  });

  function showDone(title, text) {
    doneTitle.textContent = title;
    doneText.textContent = text;
    form.hidden = true;
    done.classList.add('show');
    done.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var els = form.elements;
    // Bots fill the hidden field; pretend success and do nothing
    if (els.company.value) { showDone('Appointment requested', 'Thank you.'); return; }

    var name = els.name.value.trim();
    var phoneRaw = els.phone.value.trim();
    var digits = phoneRaw.replace(/\D/g, '');
    var date = els.date.value;

    if (!name) return showError(els.name, 'Please enter your name.');
    if (digits.length < 10 || digits.length > 13) return showError(els.phone, 'Please enter a valid phone number, at least 10 digits.');
    if (!date) return showError(els.date, 'Please choose a preferred date.');
    if (date < dateInput.min) return showError(els.date, 'Please choose today or a later date.');

    var data = {
      name: name,
      phone: phoneRaw,
      treatment: els.treatment.value,
      date: date,
      time: els.time.value
    };
    var niceDate = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    var firstName = name.split(/\s+/)[0];

    if (!FORM_ENDPOINT) {
      // No backend: hand the request over to WhatsApp with the details filled in
      var msg = 'Hello, I would like to book an appointment.\n' +
        'Name: ' + data.name + '\nPhone: ' + data.phone + '\nTreatment: ' + data.treatment +
        '\nPreferred date: ' + niceDate + '\nPreferred time: ' + data.time;
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      showDone('Almost done', 'Thanks, ' + firstName + '. WhatsApp has opened with your request filled in. Press send there and we will confirm your slot. If it did not open, call us on +91 80 5550 0142.');
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Sending...';
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      showDone('Appointment requested', 'Thanks, ' + firstName + '. We have your request for ' +
        data.treatment.toLowerCase() + ' on ' + niceDate + '. We will call ' + data.phone + ' to confirm the exact time.');
    }).catch(function () {
      showError(null, 'Sorry, that did not go through. Please try again or call +91 80 5550 0142.');
    }).then(function () {
      submit.disabled = false;
      submit.textContent = 'Request appointment';
    });
  });
})();
