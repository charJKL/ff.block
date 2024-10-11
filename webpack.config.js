const CopyPlugin = require("copy-webpack-plugin");

const CopyManifestFileList = 
[
	{from: "./src/background/manifest.json", to: "./manifest.json" },
	{from: "./src/foreground/html/blocked/*", to: "./html/blocked/[name][ext]" },
	{from: "./src/foreground/html/settings/*", to: "./html/settings/[name][ext]" },
]
const CopyManifestFileConfig = {patterns: CopyManifestFileList};
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
		clean: true,
		path: `${__dirname}/build`,
		filename: `background.index.js`,
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

