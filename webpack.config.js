var path = require('path');


module.exports = {
  entry: path.join(__dirname,'src','index.jsx'),
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js',
	library:'lib',
  },
	module: {
		rules: [
		  {
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: [
			  {
			  loader: 'babel-loader',
			  options: {
				presets: ['es2015', 'stage-0', 'react']
			  }
			}]
		  },
			//...
	  ]
}
};

