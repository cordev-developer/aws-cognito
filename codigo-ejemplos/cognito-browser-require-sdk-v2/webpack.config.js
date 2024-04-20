const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/entry.js',
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js']
	},
	// watch: true
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		historyApiFallback: true,
		port: 3006,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 
				'css-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		  inject: 'body',
		  template: './public/index.html',
		  filename: './index.html'
		}),
		new MiniCssExtractPlugin(),
	  ]
};