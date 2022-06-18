import formatTime from '../formatTime.js';

describe('Форматирует время', () => {
  test('Возвращает значение в установленном формате', () => {
    const secsInMinute = 60;
	
	expect(formatTime(secsInMinute)).toBe('00:01:00')
  });
  test('Возвращает значение в установленном формате', () => {
	
	expect(formatTime(0)).toBe('00:00:00')
  });
  test('Возвращает значение в установленном формате', () => {
	expect(formatTime()).toBe('')
  });
});
