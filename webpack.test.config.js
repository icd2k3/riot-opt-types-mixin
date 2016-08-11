"use strict";

var configFile = require('./configFile'),
    stringReplacePlugin = require('string-replace-webpack-plugin'),
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
                test: configFile.lib_riot_opt_types_mixin_regex,
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
                test: configFile.lib_riot_opt_types_mixin_regex,
                loader: 'istanbul-instrumenter'
            }
        ]
	},
	// init string replace plugin for babel omissions above
	plugins: [
        new clean([
            path.resolve(__dirname, configFile.test_report_path)
        ]),
		new stringReplacePlugin()
	]
};
