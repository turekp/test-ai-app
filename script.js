document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('helloForm');
  const nameInput = document.getElementById('nameInput');
  const output = document.getElementById('output');

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

