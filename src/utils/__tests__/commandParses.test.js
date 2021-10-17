import commandParser from '../commandParser';

describe('Парит команды телеграмма', () => {
  test('Возвращает значение в установленном формате', () => {
    const expected = {
      command: 'play',
      payload: 'https://youtu.be/8KGBHWeywjw',
    };

    const text = '/play https://youtu.be/8KGBHWeywjw';
    expect(commandParser(text)).toMatchObject(expected);
  });
});
