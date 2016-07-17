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
			/*
			 *  The below loader reads ReactPropTypes.js and performs a series of regex
			 *  replacements & removals to format the code for Riot usage. For example, renaming 'prop'
			 *  to 'opt' as well as removing unneeded code like React element type checking.
			*/
			{
				test: /ReactPropTypes\.js$/,
				loader: stringReplacePlugin.replace({
					replacements: [
						/*
						 *	Replace all instances of 'prop' with 'opt' to avoid confusion
						 *	about props vs opts in React vs Riot
						*/
						{
							pattern: /prop/g,
							replacement: function() {
								return 'opt';
							}
						},
						{
							pattern: /ReactPropTypeLocationNames\[location\]/g,
							replacement: function() {
								return `'opt' /* ReactPropTypeLocationNames[location]`
									+ ` was replaced by 'opt' in riot-opt-types-mixin webpack config */`;
							}
						},
						{
							pattern: /invalid PropType/g,
							replacement: function() {
								return `invalid optType`;
							}
						},
						/*
						 *	Remove all unneeded dependencies like ReactElement
						*/
						{
							pattern: /var ReactElement = require\(\'\.\/ReactElement\'\);/g,
							replacement: function() {
								return `/* var ReactElement = require('./ReactElement');`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						{
							pattern: /var ReactPropTypeLocationNames = require\(\'\.\/ReactPropTypeLocationNames\'\);/g,
							replacement: function() {
								return `/* var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						{
							pattern: /var getIteratorFn = require\(\'\.\/getIteratorFn\'\);/g,
							replacement: function() {
								return `/* var getIteratorFn = require('./getIteratorFnt');`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						/*
						*	Remove unnecessary optTypes "element" and "node" as they are used
						*   to validate React elements/nodes
						*/
						{
							pattern: /element\: createElementTypeChecker\(\),/g,
							replacement: function() {
								return `/* element: createElementTypeChecker`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						{
							pattern: /node\: createNodeChecker\(\),/g,
							replacement: function() {
								return `/* node: createNodeChecker`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						/*
						*	ReactElement dependency was removed above, so we also need to
						*	remove the entire createElementTypeChecker function in ReactPropTypes
						*   TODO: maybe a better way of writing this regex?
						*/
						{
							pattern: /function createElementTypeChecker\(\) \{([^}]+)\}([^}]+)\}([^}]+)\}/gm,
							replacement: function() {
								return `/* function createElementTypeChecker`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						{
							pattern: / \|\| ReactElement\.isValidElement\(optValue\)/g,
							replacement: function() {
								return `/* || ReactElement.isValidElement(optValue)`
									+ ` was removed by riot-opt-types-mixin webpack config */`;
							}
						},
						/*
						*	Remove the isNode method and checkers because it is a way of validating ReactNodes
						*	and is not needed for Riot
						*   TODO: maybe a better way of writing this regex?
						*/
						{
							pattern: /function isNode\(optValue\) \{([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}([^}]+)\}/,
							replacement: function() {
								return `/* function isNode(optValue)`
									+ ` was removed by riot-opt-types-mixin webpack config */`
							}
						},
						{
							pattern: /function createNodeChecker\(\) \{([^}]+)\}([^}]+)\}([^}]+)\}/,
							replacement: function() {
								return `/* function createNodeChecker()`
									+ ` was removed by riot-opt-types-mixin webpack config */`
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
