module.exports = function (grunt) {
	
	var pkg = require('./package.json');

	grunt.registerTask('default', ['clean', 'csslint:lax', 'jshint', 'concat', 'autoprefixer', 'mincss', 'uglify', 'zip:assets']);
	grunt.registerTask('doc', 'jsdoc:all'); /* shortcut since this is what people are used to */
	grunt.registerTask('test', ['jshint:all']);

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-zip');

	grunt.initConfig({
		clean: {
			all: ['build', 'dist']
		},
		csslint: {
			strict: {
				options: {
					'import': 2
				},
				src: ['src/css/*.css']
			},
			lax: {
				options: {
					'adjoining-classes': false,
					'box-sizing': false,
					'box-model': false,
					'import': false,
					'outline-none': false
				},
				src: ['src/css/*.css']
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'src/js/*.js'
			]
		},
		concat: {
			css: {
				src: 'src/css/*.css',
				dest: 'build/css/main.css'
			},
			js: {
				src: [
					'src/js/*.js'
				],
				dest: 'build/js/main.js'
			}
		},
		autoprefixer: {
			no_dest: {
				src: 'build/css/main.css'
			}
		},
		mincss: {
			compress: {
				files: {
					'dist/css/main.min.css': [
						'build/css/main.css'
					]
				}
			}
		},
		uglify: {
			js: {
				files: {
					'dist/js/main.min.js': [
						'build/js/main.js'
					]
				}
			}
		},
		zip: {
			assets: {
				src: ['build/**', 'dist/**', 'node_modules/**', 'src/**', 'Gruntfile.js', 'package.json'],
				dest: 'assets.zip'
			}
		}
	});

};
