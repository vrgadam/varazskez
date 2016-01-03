module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            css: {
                src: './dist/assets/varazskez.css'
            },
        },
        watch: {
            options: {
                livereload: true
            },
            jekyll_resources: {
                files: [
                    './index.html',
                    './src/includes/**/*.html',
                    './src/styles/**/*.scss',
                    './config/**/*.json',
                    './config/**/*.yml'
                ],
                tasks: ['build-jekyll']
            },
            js: {
                files: ['./src/scripts/**/*.js'],
                tasks: ['build-js']
            }
        },
        connect: {
            server: {
                options: {
                    port: 8800,
                    base: './dist',
                    hostname: 'localhost'
                }
            }
        },
        browserify: {
            build: {
                src: ['./src/scripts/main.js'],
                dest: './dist/assets/varazskez.js'
            }
        },
        jekyll: {
            options: {
                config: '_config.yml'
            },
            dev: {
                options: {

                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('build-jekyll', function() {
        var tasks = ['jekyll:dev', 'autoprefixer:css'];
        grunt.task.run(tasks);
    });

    grunt.registerTask('build-js', function() {
        var tasks = ['browserify'];
        grunt.task.run(tasks);
    });

    grunt.registerTask('serve', function() {
        grunt.task.run(['build-jekyll', 'build-js', 'connect', 'watch']);
    });

};
