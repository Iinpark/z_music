module.exports = {
	configureWebpack: (config) => config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		})
};
