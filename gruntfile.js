module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'src/cu_omni.js',
				dest: 'dist/cu_omni.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/cu_omni.min.css': 'src/cu_omni.scss'
				}
			}
		},

		copy: {
			main: {
			files: [
				{expand: true, cwd: 'src/', src: 'cu_omni.svg',  dest: 'dist/'}
		    ]
		  }
		},

		includereplace: {
			readme: {
				src: 'src/index.html',
				dest: 'index.html'
			}
		},

		watch: {
			options: {
				livereload: true,
				// files: ['dist/**/*'],
			},
			scripts: {
				files: ['src/*.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['src/*.scss'],
				tasks: ['sass']
			},
			svg: {
				files: ['src/cu_omni.svg'],
				tasks: ['copy']
			},
			html: {
				files: ['src/index.html', 'src/cu_omni.html'],
				tasks: ['copy', 'includereplace']
			}
		},


	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-include-replace');

	// Grunt Tasks
	grunt.registerTask('default', ['uglify', 'sass', 'copy', 'includereplace']);

};