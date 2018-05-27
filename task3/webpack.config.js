module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		rules:[
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				// loader: 'babel-loader?presets[]=es2015&presets[]=react'
			},
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	}
}