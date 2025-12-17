/**
 * Format date using Intl.DateTimeFormat for locale support
 */
function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Update the date display element
 */
function updateDate() {
  const now = new Date();
  const dateElement = document.getElementById('current-date');
  
  if (!dateElement) return; // Graceful exit if element missing
  
  const dateText = formatDate(now);
  const isoDate = now.toISOString().split('T')[0];
  
  // Update text content
  const dateTextSpan = dateElement.querySelector('.date-text');
  if (dateTextSpan) {
    dateTextSpan.textContent = dateText;
  } else {
    dateElement.textContent = `📅 ${dateText}`;
  }
  
  // Update datetime attribute for semantic HTML
  dateElement.setAttribute('datetime', isoDate);
  
  // Update aria-label for screen readers
  dateElement.setAttribute('aria-label', `Current date: ${dateText}`);
}

/**
 * Schedule next update at midnight
 */
function scheduleNextUpdate() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const msUntilMidnight = tomorrow - now;
  
  setTimeout(() => {
    updateDate();
    scheduleNextUpdate(); // Reschedule for next day
  }, msUntilMidnight);
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  scheduleNextUpdate();
  
  // Handle form submission
  const form = document.getElementById('helloForm');
  const nameInput = document.getElementById('nameInput');
  const output = document.getElementById('output');
  
  if (form && nameInput && output) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      if (name) {
        output.textContent = `Hello, ${name}! Today is ${formatDate(new Date())}.`;
        output.classList.add('show');
        nameInput.value = '';
      }
    });
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { formatDate, updateDate, scheduleNextUpdate };
}
