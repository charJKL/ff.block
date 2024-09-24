const path = require('path');

module.exports = 
{
	entry: `${__dirname}/src/background/background.index.ts`,
  output:
	{
		path: `${__dirname}/build`,
		filename: `background.index.js`
  },
	module:
	{
		rules: [
			{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }
		]
	},
	mode: "production"
}

