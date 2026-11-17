// Enamel Dental Studio: booking form behaviour
(function () {
  var form = document.getElementById('bookForm');
  var done = document.getElementById('formDone');
  var note = document.getElementById('formNote');
  var dateInput = document.getElementById('f-date');
  if (!form) return;

  // Do not allow past dates
  var today = new Date();
  var iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = iso;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.replace(/[^\d+]/g, '');
    var date = form.elements.date.value;

    var problem = '';
    if (!name) problem = 'Please enter your name.';
    else if (phone.replace(/\D/g, '').length < 10) problem = 'Please enter a phone number with at least 10 digits.';
    else if (!date) problem = 'Please choose a preferred date.';

    if (problem) {
      note.textContent = problem;
      note.style.color = 'var(--accent-hover)';
      return;
    }

    var nice = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('doneText').textContent =
      'Thanks, ' + name.split(' ')[0] + '. We have your request for ' + form.elements.treatment.value.toLowerCase() +
      ' on ' + nice + '. We will call ' + phone + ' to confirm the exact time.';

    // TODO: send the form data to your backend or WhatsApp API here.
    form.style.display = 'none';
    done.classList.add('show');
  });
})();
