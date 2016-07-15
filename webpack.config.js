"use strict";

// config files
//var devConfig  = require('./webpack.dev.config');
//var distConfig = require('./webpack.dist.config');

// plugins and packages
var webpack = require('webpack');
var path    = require('path');
var merge   = require('webpack-merge');
var clean   = require('clean-webpack-plugin');


// static paths
var SRC = path.resolve(__dirname, 'src');
var LIB = path.resolve(__dirname, 'lib');

// base config (both dev & dist inherit these config settings)
var config = {
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
		filename: 'riot-opt-types-mixin.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			riot: 'riot'
		}),
		new clean([
			LIB
		])
	]
};

// npm run dist vs npm run dev needs different config settings
/*if (process.env.npm_lifecycle_event === 'dist') {
	config = merge(config, distConfig);
} else {
	config = merge(config, devConfig);
}*/

// export final merged config
module.exports = config;