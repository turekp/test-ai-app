script
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('helloForm');
  const nameInput = document.getElementById('nameInput');
  const output = document.getElementById('output');
  const dateBanner = document.getElementById('dateBanner');

  // Display current date in banner
  function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    if (dateBanner) {
      dateBanner.textContent = dateString;
    }
  }

  // Initial date display
  updateDate();

  // Auto-update date every minute
  setInterval(updateDate, 60000);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
      output.textContent = `Hello ${name}!`;
      output.classList.add('show');
      nameInput.value = '';
    }
  });
});