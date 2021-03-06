module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.filename = grunt.option('filename') || 'main';

	grunt.registerTask('default', ['build', 'deploy']);
	grunt.registerTask('build', ['clean', 'csslint:lax', 'jshint', 'sass', 'concat', 'postcss', 'cleanempty', 'uglify']);
	grunt.registerTask('deploy', 'ftpush:dev');

	grunt.initConfig({
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
				dest: 'dist/css/<%= grunt.filename %>.css'
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
		'ftpush': {
			dev: {
				auth: {
					host: 'kz-endo.com',
					port: 21,
					authKey: 'key1'
				},
				src: 'dist',
				dest: 'dev/assets',
				exclusions: ['**/.DS_Store', '**/Thumbs.db', 'dist/tmp'],
				keep: ['/img', '/css/main*.css', '/js/main*.js'],
				simple: false,
				useList: false
			},
			prod: {
				auth: {
					host: 'kz-endo.com',
					port: 21,
					authKey: 'key1'
				},
				src: 'dist',
				dest: 'public/assets',
				exclusions: ['**/.DS_Store', '**/Thumbs.db', 'dist/tmp'],
				keep: ['/img', '/css/main*.css', '/js/main*.js'],
				simple: false,
				useList: false
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
		'postcss': {
			options: {
				processors: [
					require('autoprefixer')({browsers: '> 5%'})/*,
					require('cssnano')()*/
				]
			},
			dist: {
				src: 'dist/css/<%= grunt.filename %>.css'
			}
		},
		'sass': {
			dist: {
				/*options: {
					sourcemap: 'none'
				},*/
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
		'uglify': {
			dist: {
				files: {
					'dist/js/main.js': ['build/js/main.js']
				}
			}
		}
	});
};