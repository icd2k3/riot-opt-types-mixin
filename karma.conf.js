var configFile = require('./configFile.js'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    const preprocessors = {};
    preprocessors[configFile.webpack_test_context_file] = ['webpack'];

    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        singleRun: true,
        files: [
            configFile.babel_polyfill_path,
            configFile.webpack_test_context_file
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        preprocessors,
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            }
        },
        plugins: [
            'karma-chai',
            'karma-coverage',
            'karma-coveralls',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-webpack'
        ],
        reporters: [
            'mocha',
            'progress',
            'coverage',
            'coveralls'
        ],
        coverageReporter: {
            dir: configFile.test_report_path,
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true  // don't spam console when running app in karma
        }
    })
}
