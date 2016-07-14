module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test/**/*.tag',
            'test/**/*.js',
            'lib/riot-opt-types.js'
        ],
        frameworks: [
            'commonjs',
            'mocha',
            'chai',
            'riot'
        ],
        preprocessors: {
            'test/**/*.tag': ['riot', 'babel', 'commonjs'],
            'test/**/*.js': ['babel', 'commonjs'],
            'lib/riot-opt-types.js': ['commonjs']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            },
        },
        plugins: [
            'karma-babel-preprocessor',
            'karma-commonjs',
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-riot'
        ],
        reporters: ['mocha'],
        commonjsPreprocessor: {
            modulesRoot: 'test'
        },
        riotPreprocessor: {
            options: {
                type: 'babel'
            }
        },
        //failOnEmptyTestSuite: false,
       // singleRun: true
        //,
        //logLevel: 'debug'
    })
}
