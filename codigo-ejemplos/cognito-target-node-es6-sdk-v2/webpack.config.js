// Import path for resolving file paths
const path = require('path');

module.exports = {
	entry: './src/entry.js',
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js']
	},
	target: 'node'
};