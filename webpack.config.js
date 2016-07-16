"use strict";

// plugins and packages
var webpack = require('webpack');
var path    = require('path');
var clean   = require('clean-webpack-plugin');
var stringReplacePlugin = require('string-replace-webpack-plugin');


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
			},
			{
				test: /ReactPropTypes\.js$/,
				loader: stringReplacePlugin.replace({
					replacements: [
						{
							pattern: /prop/g,
							replacement: function() {
								return 'opt';
							}
						},
						{
							pattern: /ReactPropTypeLocationNames\[location\]/g,
							replacement: function() {
								return `'opt'`;
							}
						},
						{
							pattern: /var ReactPropTypeLocationNames = require\(\'\.\/ReactPropTypeLocationNames\'\);/g,
							replacement: function() {
								return '';
							}
						},
						{
							pattern: /var ReactElement = require\(\'\.\/ReactElement\'\);/g,
							replacement: function() {
								return '';
							}
						},
						{
							pattern: /element\: createElementTypeChecker\(\),/g,
							replacement: function() {
								return '';
							}
						},
						{
							pattern: /function createElementTypeChecker\(\) \{([^}]+)\}([^}]+)\}([^}]+)\}/gm,
							replacement: function() {
								return '';
							}
						}
					]
				})
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
		]),
		new stringReplacePlugin()
	],
	resolve: {
		extensions: ['', '.js']
	}
};
