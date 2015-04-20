module.exports = function (grunt) {

	grunt.initConfig({

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: './src/sass',
					src: ['*.scss', '*.sass'],
					dest: './dist',
					ext: 'bundle.css'
				}]
			}
		},

		babel: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					"./dist/bundle.js": "./src/js/*.js"
				}
			}
		},

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'./dist/bundle.html': './src/html/*.jade'
				}
			}
		},

		inline: {
			dist: {
				src: './dist/bundle.html',
				dest: './build/index.html'
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'./build/index.min.html': './build/index.html'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-inline');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('css', ['sass']);
	grunt.registerTask('js', ['babel']);
	grunt.registerTask('html', ['jade']);
	grunt.registerTask('default', ['inline', 'htmlmin']);

};