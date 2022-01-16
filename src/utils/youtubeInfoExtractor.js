const extractor = (id) => {
	const queryParams = new URLSearchParams({
		id,
		key: process.env.VUE_APP_YOUTUBE_API_KEY
	})
	return fetch(`https://www.googleapis.com/youtube/v3/videos?${queryParams.toString()}`)
		.then(r => r.json())
}

export default extractor