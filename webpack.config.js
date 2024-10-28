const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyManifestFileList = 
[
	{from: "./src/background/manifest.json", to: "./manifest.json" },
	{from: "./src/foreground/html/blocked/*", to: "./html/blocked/[name][ext]" },
	{from: "./src/foreground/html/settings/*.html", to: "./html/settings/[name][ext]" },
]
const CopyManifestFileConfig = {patterns: CopyManifestFileList};
const CopyManifestFilePluginInstance = new CopyPlugin(CopyManifestFileConfig);
const MiniCssExtractPluginInstance = new MiniCssExtractPlugin();

// TODO static pages should be in separate configuration 
module.exports = 
{
	mode: "production",
	entry: 
	{
		"background": `${__dirname}/src/background/background.ts`,
		"html/settings/settings": `${__dirname}/src/foreground/html/settings/settings.tsx`,
	},
  output:
	{
		clean: true,
		path: `${__dirname}/build`,
		filename: `[name].js`,
  },
	resolve:
	{
		extensions: [".ts", ".tsx", ".js"],
	},
	module:
	{
		rules: [
			{ test: /(\.ts|\.tsx)$/, use: ["ts-loader"], exclude: /node_modules/ },
			{ test: /(\.css)$/, use: [MiniCssExtractPlugin.loader, {loader: "css-loader"}] }
		]
	},
	plugins:
	[
		CopyManifestFilePluginInstance,
		MiniCssExtractPluginInstance
	]
}
