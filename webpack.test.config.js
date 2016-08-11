"use strict";

var stringReplacePlugin = require('string-replace-webpack-plugin'),
    path = require('path'),
    clean = require('clean-webpack-plugin'),
    TEST_REPORT = path.resolve(__dirname, 'test-coverage-report');

// test config
module.exports = {
	devtool: 'inline-source-map',
	module: {
		// this loader allows istanbul code coverage reported to ignore code that is added from Babel
		loaders: [
			{
                test: /lib\/riot-opt-types-mixin\.js$/,
                loader: stringReplacePlugin.replace({
                    /*
                    *  These replacements tell test coverage reports to ignore code that has been compiled & added
                    *  via webpack, babel, etc
                    */
                    replacements: [
                        {
                            pattern: /else if\(typeof define/g,
                            replacement: function() {
                                return `/* istanbul ignore next */ else if(typeof define`;
                            }
                        },
                        {
                            pattern: /return installedModules/g,
                            replacement: function() {
                                return `/* istanbul ignore next */ return installedModules`;
                            }
                        },
                        {
                            pattern: /function _interopRequireDefault/g,
                            replacement: function() {
                                return `/* istanbul ignore next */ function _interopRequireDefault`;
                            }
                        }
                    ]
                })
            }
		],
        // this is necessary or else test report will be for entire webpack bundle instead of each component
        postLoaders: [
            {
                test: /lib\/riot-opt-types-mixin\.js$/,
                loader: 'istanbul-instrumenter'
            }
        ]
	},
	// init string replace plugin for babel omissions above
	plugins: [
        new clean([
            TEST_REPORT
        ]),
		new stringReplacePlugin()
	]
};
