module.exports = function (grunt) {
	
	var pkg = require('./package.json');

	grunt.registerTask('default', ['clean', 'sass', 'csslint:lax', 'jshint', 'mochaTest', 'concat', 'autoprefixer', 'mincss', 'uglify', 'ftp-deploy']);
	grunt.registerTask('doc', ['jsdoc']);
	grunt.registerTask('watch', ['watch']);

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ftp-deploy');
	grunt.loadNpmTasks('grunt-git-deploy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		'clean': {
			all: ['build', 'dist']
		},
		'sass': {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss'],
					dest: 'src/css',
					ext: '.css'
				}]
			}
		},
		'csslint': {
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
					'ids': false,
					'import': false,
					'known-properties': false,
					'outline-none': false
				},
				src: ['src/css/*.css']
			}
		},
		'jshint': {
			all: [
				'Gruntfile.js',
				'src/js/*.js'
			]
		},
		'mochaTest': {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']
			}
		},
		'jsdoc': {
			dist: {
				src: ['src/js/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		'concat': {
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
		'autoprefixer': {
			no_dest: {
				src: 'build/css/main.css'
			}
		},
		'mincss': {
			compress: {
				files: {
					'dist/css/main.min.css': [
						'build/css/main.css'
					]
				}
			}
		},
		'uglify': {
			js: {
				files: {
					'dist/js/main.min.js': [
						'build/js/main.js'
					]
				}
			}
		},
		'zip': {
			assets: {
				src: ['build/**', 'dist/**', 'node_modules/**', 'src/**', 'Gruntfile.js', 'package.json'],
				dest: 'assets.zip'
			}
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'kz-endo.com',
					port: 21,
					authKey: 'key1'
				},
				src: 'dist',
				dest: '/public/assets',
				exclusions: ['dist/**/.DS_Store', 'dist/**/Thumbs.db', 'dist/tmp'],
				server_sep: '/'
			}
		},
		'watch': {
			files: ['src/**'],
			tasks: ['default']
		}
	});

};