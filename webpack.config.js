//var
const path = require("path")
const webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin');

//plagins
const ExtractTextPlagin = require("extract-text-webpack-plugin")
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

//module
module.exports = {
	//base way
	context: path.resolve(__dirname, 'src'),
	//entry js
	entry: {
		app: [
			'./js/app.js',
			'./scss/style.scss',
		],
	},

	//dist
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '../',
		library:'lib',
	},

	//dev-server
	devServer: {
		contentBase: './app',
		//compress: true,
		//port: 9000,
	},

	module: {
		rules: [
			{
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			use: [{
				  loader: 'babel-loader',
				  options: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy']
				  }
				}],
			},
			//scss
			{
				test: /\.scss$/,
				use: ExtractTextPlagin.extract({
					use: [

						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							},
						},
					],
					fallback: 'style-loader',
				})
			},

			//Img
			{
				test: /\.(png|gif|jpe?g)$/,
				loaders:[{
					loader:'file-loader',
				options:{
				name:'[path][name].[ext]',
			},
				},
			'img-loader',
		]
			}
		],
	},

	plugins: [
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			jquery:'jquery',
			Popper: ['popper.js','default'],
		}),
		new ExtractTextPlagin(
			'./css/[name].css'
		),
		new CleanWebpackPlugin(['dist']),
	],
}
