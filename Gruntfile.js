module.exports = function (grunt) {

	grunt.initConfig({
		inline: {
			dist: {
				src: './dist/index.html',
				dest: './index.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-inline');
	grunt.registerTask('default', ['inline']);

};