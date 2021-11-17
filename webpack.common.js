const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	entry: path.join(__dirname, "client", "index.js"),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						// inject CSS to page
						loader: 'style-loader'
					},
					{
						// translates CSS into CommonJS modules
						loader: 'css-loader'
					},
					{
						// Run postcss actions
						loader: 'postcss-loader',
						options: {
							// `postcssOptions` is needed for postcss 8.x;
							// if you use postcss 7.x skip the key
							postcssOptions: {
								// postcss plugins, can be exported to postcss.config.js
								plugins: function () {
									return [
										require('autoprefixer')
									];
								}
							}
						}
					},
					{
						// compiles Sass to CSS
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "client", "index.html")
		}),
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: './manifest.json' },
				// { from: './src/icons/icon16.png' },
				// { from: './src/icons/icon48.png' },
				// { from: './src/icons/icon128.png' },
			],
		}),
	]
}