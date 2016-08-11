var webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    const preprocessors = {};
    preprocessors['webpack.test.context.js'] = ['webpack'];

    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        singleRun: true,
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'webpack.test.context.js'
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
            dir: 'test-coverage-report/',
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
