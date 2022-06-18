const formatTime = (sec) => {
try {
	return new Date(sec * 1000).toISOString().substr(11, 8);
} catch (error) {
	console.error(error);
	return ''
}
};

export default formatTime;
