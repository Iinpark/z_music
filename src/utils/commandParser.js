/**
 * @param text {String} 
 * @param entites {Array} 
 */
const parser = (text) => {
	if (!text.startsWith('/')) {
		throw new Error(`${text} не является командой`)
	}

	const tokens = text.split(' ');
	return {
		command: tokens[0].replace('/', ''),
		payload: tokens[1]
	}
}

export default parser;