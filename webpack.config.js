"use strict";

// plugins and packages
var webpack = require('webpack');
var path    = require('path');
var clean   = require('clean-webpack-plugin');


// static paths
var SRC = path.resolve(__dirname, 'src');
var LIB = path.resolve(__dirname, 'lib');

// base config (both dev & dist inherit these config settings)
module.exports = {
	entry: SRC + '/riot-opt-types-mixin',
	module: {
		preLoaders: [
			{
				test: /\.tag$/,
				exclude: /node_modules/,
				loader: 'riotjs-loader',
				query: { type: 'none' }
			},
			{
				test: /\.js$|\.tag$/,
				loaders: [
					'eslint-loader'
				],
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$|\.tag$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	output: {
		path: LIB,
		filename: 'riot-opt-types-mixin.js',
		library: 'riot-opt-types-mixin',
		libraryTarget: 'umd'
	},
	plugins: [
		new webpack.ProvidePlugin({
			riot: 'riot'
		}),
		new clean([
			LIB
		])
		/*,
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})*/
	],
	resolve: {
		extensions: ['', '.js']
	}
};
