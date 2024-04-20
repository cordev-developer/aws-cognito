const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
	entry: './src/entry.js',
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js']
	},

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
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 
				'css-loader']
			}
		]
	},

	plugins: [
		// new CompressionWebpackPlugin({
		// 	algorithm: 'gzip',
		// 	test: /\.js$|\.css$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8,
		//   }),
		new HtmlWebpackPlugin({
		  inject: 'body',
		  template: './public/index.html',
		  filename: './index.html'
		}),
		new MiniCssExtractPlugin()
	  ]
};