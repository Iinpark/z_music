import idExtractor from '../youtubeVideoIdExtractor.js';

describe('idExtractor', () => {

	test('returns youtube video id', () => {
		const link = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		expect(idExtractor(link)).toBe('dQw4w9WgXcQ');
	})

	test('returns empty string if no youtube id found', () => {
		const link = 'https://www.youtube.com/';
		expect(idExtractor(link)).toBe('');
	})
})