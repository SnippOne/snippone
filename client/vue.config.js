// html-critical-webpack-plugin
// eslint-webpack-plugin

module.exports = {
	lintOnSave: false,
	configureWebpack: {
		devtool:	"source-map",
		devServer: {
			allowedHosts: [
				'snippone.io'
			]
		}
	}
}