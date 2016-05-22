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
          './config/**/*.json',
          './config/**/*.yml'
        ],
        tasks: ['build-jekyll']
      },
      js: {
        files: ['./src/scripts/**/*.js'],
        tasks: ['build-js']
      },
      sass: {
        files: ['src/styles/**/*.scss'],
        tasks: ['sass']
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
    sass: { 
      dist: { 
        options: { 
          style: 'expanded',
          trace: true
        },
        files: { 
          'dist/assets/varazskez.css': 'src/styles/main.scss'
        }
      }
    },
    express: {
      all: {
        options: {
          port: 8800,
          hostname: 'localhost',
          bases: ['./dist'],
          livereload: true
        }
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
    var tasks = ['jekyll:dev'];
    grunt.task.run(tasks);
  });

  grunt.registerTask('build-js', function() {
    var tasks = ['browserify'];
    grunt.task.run(tasks);
  });

  grunt.registerTask('serve', function() {
    grunt.task.run(['jekyll', 'sass', 'autoprefixer', 'build-js', 'express', 'watch']);
  });

};
