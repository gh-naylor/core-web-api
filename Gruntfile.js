module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'app.js',
        'Gruntfile.js',
        'lib/**/*.js',
        'config/**/*.js',
        'routes/**/*.js',
        'test/**/*.js'
      ]
    },
    mochacli: {
      options: {
        require: ['should'],
        reporter: 'spec',
        bail: true,
        recursive: true,
        timeout: '15s'
      },
      all: ['test/*.js']
    },
    jsdoc: {
      dist: {
        src: [
          'app.js',
          'lib/**/*.js',
          'config/**/*.js',
          'routes/**/*.js',
          'test/**/*.js',
          'README.md'
        ],
        options: {
          destination: 'docs',
          configure: 'config/jsdoc.json'
        }
      }
    },
    shell: {
      server: {
        command: './node_modules/node-dev/bin/node-dev app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('server', ['shell']);
  grunt.registerTask('default', ['mochacli', 'jshint', 'jsdoc']);
};