module.exports = function (grunt) {
	
	var pkg = require('./package.json');

	grunt.registerTask('default', ['clean', 'jshint', 'concat', 'mincss', 'uglify']);

	grunt.registerTask('doc', 'jsdoc:all'); /* shortcut since this is what people are used to */
	grunt.registerTask('test', ['jshint:all']);

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		/* self explanatory really, but you'll want to place any of the directories that need to be cleaned up here */
		clean: {
			all: ['build', 'dist']
		},

		/* Runs JS lint on all your src files and gruntfile */
		jshint: {
			all: [
				'Gruntfile.js',
				'src/js/*.js'
			]
		},

		concat: {
			/* takes the base CSS along with the desktop/mobile CSS styles and creates a desktop/mobile application CSS file 
			 * if you do not have mobile styles, you could remove the mobilecss task and just concat the desktop CSS files together. */
			css: {
				src: 'src/css/*.css',
				dest: 'build/css/main.css'
			},
			/* Concatenating all the js here since these projects are not usually js heavy and order probably won't matter.  If needed, you can specify the actual order as an array */
			js: {
				src: [
					'src/js/*.js'
				],
				dest: 'build/js/main.js'
			}
		},

		/* minifies the concatanated CSS before copying them into the dist folder */
		mincss: {
			compress: {
				files: {
					'dist/css/main.min.css': [
						'build/css/main.css'
					]
				}
			}
		},

		/* minifies the JS and adds the version as well as time stamp at the top for easy checking against git */
		uglify: {
			js: {
				files: {
					'dist/js/main.min.js': [
						'build/js/main.js'
					]
				}
			}
		}

	});

};
