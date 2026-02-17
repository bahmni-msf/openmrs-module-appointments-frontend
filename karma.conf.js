const webpackConfig = require('./webpack.config.js');

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        browsers: ['jsdom'],
        browserNoActivityTimeout: 100000,
        autoWatch: false,
        singleRun: true,
        files: [
            {pattern: 'node_modules/moment/min/moment.min.js', watched: false},
            {pattern: 'node_modules/q/q.js', watched: false},
            {pattern: 'node_modules/whatwg-fetch/dist/fetch.umd.js', watched: false},
            {pattern: 'dist/appointment.js', watched: false},
            {pattern: 'dist/config/*.json', watched: false, included: false},
            {pattern: 'dist/i18n/**/*.json', watched: false, included: false},
            {pattern: 'node_modules/angular-mocks/angular-mocks.js', watched: false},

            {pattern: 'test/ng-test-constants.js', watched: false},
            {pattern: 'test/support/*.js', watched: false},
            {pattern: 'test/**/*spec.js', watched: false},
        ],
        reporters: ['junit', 'progress', 'coverage'],
        preprocessors: {
            'dist/appointment.js': ['coverage'],
        },
        coverageReporter: {
            reporters: [
                {type: 'json', dir: 'coverage/json', subdir: '.', file: 'coverage-final.json'},
                {type: 'html', dir: 'coverage/html', subdir: '.'},
                {type: 'text-summary'}
            ]
        },
        junitReporter: {
            outputFile: 'output/unit.xml',
            suite: 'unit'
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only',
        },
        proxies: {
            '/config/': '/base/dist/config/',
            '/i18n/': '/base/dist/i18n/',
            '/bahmni_config/openmrs/i18n/': '/base/dist/i18n/'
        },
        client: {
            captureConsole: false,
            jasmine: {
                random: false
            }
        }
    });
};