const { formatDate, updateDate, scheduleNextUpdate } = require('./script.js');

describe('Date Display Functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="date-display-container" role="region" aria-label="Current date">
        <time class="date-display" id="current-date" datetime="">
          📅 <span class="date-text">Loading...</span>
        </time>
      </div>
    `;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  describe('formatDate', () => {
    test('should format date as "Day, Month Date, Year"', () => {
      const date = new Date('2024-01-15T12:00:00');
      const result = formatDate(date);
      expect(result).toMatch(/Monday, January 15, 2024/);
    });

    test('should handle different dates correctly', () => {
      const date = new Date('2024-12-25T12:00:00');
      const result = formatDate(date);
      expect(result).toMatch(/Wednesday, December 25, 2024/);
    });

    test('should handle leap year dates', () => {
      const date = new Date('2024-02-29T12:00:00');
      const result = formatDate(date);
      expect(result).toContain('February 29');
      expect(result).toContain('2024');
    });
  });

  describe('updateDate', () => {
    test('should update date display element', () => {
      const mockDate = new Date('2024-01-15T12:00:00');
      jest.setSystemTime(mockDate);
      
      updateDate();
      
      const dateElement = document.getElementById('current-date');
      const dateTextSpan = dateElement.querySelector('.date-text');
      expect(dateTextSpan.textContent).toContain('January 15');
      expect(dateElement.getAttribute('datetime')).toBe('2024-01-15');
    });

    test('should handle missing element gracefully', () => {
      document.body.innerHTML = '';
      expect(() => updateDate()).not.toThrow();
    });

    test('should update datetime attribute', () => {
      const mockDate = new Date('2024-06-15T12:00:00');
      jest.setSystemTime(mockDate);
      
      updateDate();
      
      const dateElement = document.getElementById('current-date');
      expect(dateElement.getAttribute('datetime')).toBe('2024-06-15');
    });
  });

  describe('scheduleNextUpdate', () => {
    test('should schedule update at midnight', () => {
      const mockDate = new Date('2024-01-15T10:30:00');
      jest.setSystemTime(mockDate);
      
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      scheduleNextUpdate();
      
      expect(setTimeoutSpy).toHaveBeenCalled();
      const delay = setTimeoutSpy.mock.calls[0][1];
      expect(delay).toBeGreaterThan(0);
      expect(delay).toBeLessThan(24 * 60 * 60 * 1000);
      
      setTimeoutSpy.mockRestore();
    });

    test('should call updateDate after timeout', () => {
      const mockDate = new Date('2024-01-15T23:59:00');
      jest.setSystemTime(mockDate);
      
      scheduleNextUpdate();
      
      jest.advanceTimersByTime(60000); // Advance 1 minute
      jest.setSystemTime(new Date('2024-01-16T00:00:00'));
      jest.runOnlyPendingTimers();
      
      const dateElement = document.getElementById('current-date');
      const dateTextSpan = dateElement.querySelector('.date-text');
      expect(dateTextSpan.textContent).toContain('January 16');
    });

    test('should reschedule itself after update', () => {
      const mockDate = new Date('2024-01-15T10:30:00');
      jest.setSystemTime(mockDate);
      
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      scheduleNextUpdate();
      
      const initialCallCount = setTimeoutSpy.mock.calls.length;
      
      jest.advanceTimersByTime(13 * 60 * 60 * 1000);
      jest.setSystemTime(new Date('2024-01-16T00:00:00'));
      jest.runOnlyPendingTimers();
      
      expect(setTimeoutSpy.mock.calls.length).toBeGreaterThan(initialCallCount);
      
      setTimeoutSpy.mockRestore();
    });
  });
});

