module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // JavaScript压缩任务
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            my_target: {
                files: {
                    'js/app.min.js': ['js/app.js'],
                    'js/jcarousel.min.js': ['js/jcarousel.js']
                }
            }
        },
        // less任务，将less编译成css，并通过autoprefix插件进行后处理，通过clean-css插件进行压缩
        less: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                plugins: [
                new(require('less-plugin-autoprefix'))({
                        browsers: [">1%", "last 2 versions", "Firefox ESR", "Opera 12.1"]
                    }),
                new(require('less-plugin-clean-css'))({
                        advanced: true,
                        compatibility: "ie8"
                    })
                ]
            },
            my_target: {
                files: {
                    'css/styles.css': ['css/styles.less']
                }
            }
        }
    });

    // 加载包含uglify以及less任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify', 'less']);

};