exports.config = {
    "helpers": {
        "WebDriverIO": {
            "desiredCapabilities": {
                "name": "test-carnava",
                "group": "group-carnava"
            },
            "host": process.env.SELENIUM_HOST || 'localhost',   // Selenium url,
            "port": process.env.SELENIUM_PORT || '4444',   // Selenium url,
            // load variables from the environment and provide defaults
            "url": 'https://www.google.nl',
            "browser": process.profile || "chrome",
            "restart": "false",
            "windowSize": "1440x900"
        },
        "InitHelper": {
            "require": "./init_helper.js"
        }
    },
    "tests": "./testcases/*_test.js",
    "timeout": 120000,
    "output": "./output",
    "include": {
        "I": "./steps_file.js",
        "LoginPage": "./pages/login_page.js",
        "LogoutPage": "./pages/logout_page.js"
    },
    "multiple": {
        "basic": {
            "grep": 'DUI',
            "browsers": [{
                browser: 'chrome',
                windowSize: 'maximize'
            },
                // {browser: 'chrome', windowSize: '1220x1000'},
                // {browser: 'chrome', windowSize: '1024x1000'},
                // {browser: 'chrome', windowSize: '768x1000'},
                // {browser: 'chrome', windowSize: '320x1000'},

                {
                    browser: 'firefox',
                    windowSize: 'maximize'
                },
                // {browser: 'firefox', windowSize: '1220x1000'},
                // {browser: 'firefox', windowSize: '1024x1000'},
                // {browser: 'firefox', windowSize: '768x1000'},
                // {browser: 'firefox', windowSize: '320x1000'},

                {
                    browser: 'safari',
                    windowSize: 'maximize'
                },
                // {browser: 'safari', windowSize: '1220x1000'},
                // {browser: 'safari', windowSize: '1024x1000'},
                // {browser: 'safari', windowSize: '768x1000'},
                // {browser: 'safari', windowSize: '320x1000'}
            ]
        },
        "smoke": {
            // run only tests containing "@smoke" in name
            "grep": '@smoke',

            // use firefox and different chrome configurations
            "browsers": [
                'firefox', {
                    browser: 'chrome',
                    windowSize: 'maximize'
                },
                // replace any config values from WebDriverIO helper

                {
                    browser: 'safari',
                    windowSize: '1220x1000'
                }, {
                    browser: 'safari',
                    windowSize: '1024x1000'
                }, {
                    browser: 'safari',
                    windowSize: '768x1000'
                }, {
                    browser: 'sfari',
                    windowSize: '320x1000'
                }

            ]
        }
    },

    "bootstrap": false,
    "mocha": {
        "reporterOptions": {
            "reportDir": "output",
            "reportFilename": "index",
            "enableCharts": true,
            "autoOpen": true,
            "quiet": true,
            "inlineAssets": false
        }
    }
};
