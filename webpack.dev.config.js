"use strict";

var stringReplacePlugin = require('string-replace-webpack-plugin'),
    path = require('path'),
    clean = require('clean-webpack-plugin'),
    LIB = path.resolve(__dirname, 'lib');

// test config
module.exports = {
    module: {
        preLoaders: [
            {
                test: /\.js$|\.tag$/,
                loaders: [
                    'eslint-loader'
                ],
                exclude: /node_modules/
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
        new clean([
            LIB
        ])
    ]
};
