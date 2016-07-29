module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test/**/*.tag',
            'test/**/*.js',
            'lib/riot-opt-types-mixin.js'
        ],
        frameworks: [
            'env',
            'commonjs',
            'mocha',
            'chai',
            'riot'
        ],
        preprocessors: {
            'test/**/*.tag': ['riot', 'babel', 'commonjs'],
            'test/**/*.js': ['babel', 'commonjs'],
            'lib/riot-opt-types-mixin.js': ['commonjs', 'coverage']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            },
        },
        client: {
            env: {
                NODE_ENV: 'test'
            }
        },
        plugins: [
            'karma-env',
            'karma-babel-preprocessor',
            'karma-commonjs',
            'karma-coveralls',
            'karma-coverage',
            'karma-mocha',
            'karma-chai',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-riot'
        ],
        reporters: ['mocha', 'progress', 'coverage', 'coveralls'],
        coverageReporter: {
            dir: 'test-coverage-report/',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'lcov', subdir: 'lcov'}
            ]
        },
        commonjsPreprocessor: {
            modulesRoot: 'test'
        },
        riotPreprocessor: {
            options: {
                type: 'babel'
            }
        },
        singleRun: true
    })
}
