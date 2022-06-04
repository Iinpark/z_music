export default (secs, handler) => {
	let secsLeft = secs;
	let id;

	const updater = () => {
		if ( secsLeft > 0) {
			secsLeft = secsLeft - 1
			handler(secsLeft)
		} else {
			clearInterval(id)
		}

	}
	id = setInterval(updater, 1000)
};