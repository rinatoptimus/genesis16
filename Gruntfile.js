module.exports = function(grunt) {
 
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "dist/css/main.css": "less/main.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], 
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },

    concat: {
      dist: {
            src: [
                'js/libs/*.js',
                'js/modules/*.js'
            ],
            dest: 'dist/js/production.js',
        }
    },
    uglify: {
      build: {
            src: ['dist/js/production.js'],
            dest: 'dist/js/production.min.js'
            
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    yuidoc: {
        all: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
                paths: ['js/modules', 'js/reqiurejs'],
                outdir: './docs/'
            }
        }
    }



  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-yuidoc");

  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask("docs", ["yuidoc"]);
  
};