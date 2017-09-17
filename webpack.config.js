const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = {

	//This is the entry point of the project.
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'), //Save it to folder called build with filename as bundle.js. Any filename can be used.
		filename: 'bundle.js',
		publicPath: 'build/' //This is required else it will search image in wrong directory.
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/ //Babel gets appliedonly to js files.
		    },
			{
				//use: ['style-loader', 'css-loader'], //works from right to left, output of css loader is sent to file laoder.,
				use: ExtractTextPlugin.extract({ //Add this when using extract plugin for CSS.
					fallback: 'style-loader',
					use: ['css-loader']
				}),
				test: /\.css$/
				},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 40000
					} //Size of the image whihc is 40KB to make decision whehter it should be put in bundle.js or not by url-loader
				}, 'image-webpack-loader']

            }]
	},

	//Used while using extract plugin.Output of the css loader will be saved in style.css
	plugins: [
		new ExtractTextPlugin('style.css')
	]
};

module.exports = config;
