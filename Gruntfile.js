module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['clean', 'csslint:lax', 'jshint', 'sass', 'concat', 'autoprefixer', 'cleanempty', 'cssmin', 'uglify']);
	grunt.registerTask('deploy', ['sftp-deploy']);

	grunt.initConfig({
		'autoprefixer': {
			options: {
				browsers: ['last 2 versions']
			},
			no_dest: {
				src: 'build/css/main.css'
			}
		},
		'clean': {
			all: ['build/', 'dist/']
		},
		'cleanempty': {
			options: {
				noJunk: true
			},
			src: ['build/**', 'dist/**'],
		},
		'concat': {
			css: {
				src: ['build/css/*.css', 'src/**/*.css'],
				dest: 'build/css/main.css'
			},
			js: {
				src: ['src/**/*.js'],
				dest: 'build/js/main.js'
			}
		},
		'csslint': {
			strict: {
				options: {
					'import': 2
				},
				src: ['src/**/*.css']
			},
			lax: {
				options: {
					'box-sizing': false,
					'box-model': false,
					'floats': false,
					'font-sizes': false,
					'ids': false,
					'import': false,
					'qualified-headings': false,
					'regex-selectors': false,
					'unique-headings': false
				},
				src: ['src/**/*.css']
			}
		},
		'cssmin': {
			compress: {
				files: {
					'dist/css/main.min.css': ['build/css/main.css']
				}
			}
		},
		'jshint': {
			options: {
				browser: true,
				globals: {
					jQuery: true
				},
				laxcomma: true
			},
			all: ['Gruntfile.js', 'src/**/*.js']
		},
		'sass': {
			dist: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'src/',
					src: ['**/*.scss'],
					dest: 'build/css/',
					ext: '.css'
				}]
			}
		},
		'sftp-deploy': {
			build: {
				auth: {
					host: 'kz-endo.com',
					port: 22,
					authKey: 'key1'
				},
				src: 'dist',
				dest: '/public/assets',
				exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp'],
				server_sep: '/'
			}
		},
		'uglify': {
			dist: {
				files: {
					'dist/js/main.min.js': ['build/js/main.js']
				}
			}
		}
	});
};