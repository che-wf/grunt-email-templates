/*global module:false*/
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		pkg: grunt.file.readJSON('package.json'),
		inlinecss: {
			main: {
				options: {

				},
				files: {
					'www/example.html': 'src/templates/example.html'
				}
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('pixrem')(), // add fallbacks for rem units
					require('autoprefixer')({
						browsers: 'last 3 versions'
					}), // add vendor prefixes
					require('cssnano')(), // minify the result
					require('postcss-cssnext')()
				],
				syntax: require('postcss-scss')
			},
			dist: {
				src: 'src/css/example-fresh.css',
				dest: 'src/css/example.css'
			}
		},
		sass: {
			www: {
				options: {
					style: 'expanded',
				},
				files: {
					'src/css/example-fresh.css': [
						'src/scss/example.scss',
					]
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			page: {
				files: 'src/templates/*.html',
				tasks: ['sass', 'postcss', 'inlinecss']
			},
			css: {
				files: 'src/scss/*.scss',
				tasks: ['sass', 'postcss', 'inlinecss']
			}
		}
	});

	// grunt.loadNpmTasks(''); // This is the only one that doesn't match Grunt structure

	// Default task.
	grunt.registerTask('default', ['sass', 'postcss', 'inlinecss']);

};
