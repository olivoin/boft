module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'assets/js/libs/*.js',
                    'assets/js/vendor/*.js',
                    'assets/js/parts/*.js'
                ],
                dest: 'assets/js/production.js'
            }
        },
        
        uglify: {
            build: {
                src: 'assets/js/production.js',
                dest: 'assets/js/production.min.js'
            }
        },
        
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1,
            keepSpecialComments: 0
          },
          target: {
            files: {
              'assets/css/production.css': [
                  'assets/css/libs/*.css',
                  'assets/css/parts/*.css',
                  'assets/css/responsive/*.css',
                  'assets/css/vendor/*.css'
              ],
            },
          },
        },
                
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },

            single_file: {
                src: 'assets/css/production.css',
                dest: 'assets/css/production_post.css'
            }
          },
        
        tinypng: {
            options: {
                apiKey: "AnWeKagK92G8sl-L9OBJyiu0Qp5zIXBV",
                checkSigs: true,
                sigFile: 'assets/images/file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true,
            },
            /*compress: {
                src: ['*.png', '*.jpg'],
                cwd: 'assets/images/',
                dest: 'assets/images/',
                expand: true
            },*/
            compress2: {
                src: ['**/*.{png,jpg,jpeg}'],
                cwd: '../../uploads/',
                dest: '../../uploads/',
                expand: true,
            },
            
          },
        
        watch: {
            scripts: {
                files: [
                    'assets/js/libs/*.js',
                    'assets/js/vendor/*.js',
                    'assets/js/parts/*.js',
                    'assets/css/libs/*.css',
                    'assets/css/parts/*.css',
                    'assets/css/responsive/*.css',
                    'assets/css/vendor/*.css'
                ],
                tasks: ['concat','uglify', 'cssmin', 'autoprefixer' ],
                options: {
                    spawn: false,
                },
            }
        }
        
        
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'uglify' , 'cssmin', 'autoprefixer', 'tinypng', 'watch']);

    
};