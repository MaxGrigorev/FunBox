var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
        vendors: path.join(__dirname, 'src', 'vendors.jsx'),
        app: path.join(__dirname, 'src', 'index.jsx')
    },
  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].js',
	library:'lib',
  },
	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [{
				  loader: 'babel-loader',
				  options: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ['react-html-attrs', 'transform-decorators-legacy']
				  }
				}],
			},
			{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]"
            },
            {
                test: /\.ttf$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]"
            },
            {
                test: /\.eot$/,
                loader: "url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]"
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=10000&mimetype=application/svg+xml&name=./fonts/[name].[ext]"
            }
	  ]
	},
	resolve: {extensions: ['.js', '.jsx', '.sass', '.css']
    },
	plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: path.join(__dirname, 'dist', 'index.html')
        }),
    ]
};

