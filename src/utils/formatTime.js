const formatTime = (sec) => {
	return new Date(sec * 1000).toISOString().substr(11, 8);
};

export default formatTime;
