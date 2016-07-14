"use strict";

// plugins and packages
var webpack = require('webpack');
var path    = require('path');
var clean   = require('clean-webpack-plugin');

// static paths
var LIB = path.resolve(__dirname, 'lib');
var SRC  = path.resolve(__dirname, 'src');

// LIB config
module.exports = {
	output: {
		path: LIB,
		filename: 'riot-opt-types.js'
	},
	plugins: [
		new clean([
			LIB
		])
	]
};
