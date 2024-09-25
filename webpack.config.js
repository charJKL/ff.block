const CopyPlugin = require("copy-webpack-plugin");

const CopyManifestFileConfig = {patterns: [{from: "./src/background/manifest.json", to: "./manifest.json" }]};
const CopyManifestFilePlugin = new CopyPlugin(CopyManifestFileConfig);

module.exports = 
{
	mode: "production",
	entry: 
	{
		main:`${__dirname}/src/background/background.index.ts`, 
	},
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
	plugins:
	[
		CopyManifestFilePlugin,
	]
}

