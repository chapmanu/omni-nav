module.exports = function(grunt) {

	// Begin Grunt Setup
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				src: 'src/omni-nav.js',
				dest: 'dist/omni-nav.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/main-omni-nav.min.css': 'src/main-omni-nav.scss'
				}
			}
		},

		copy: {
			main: {
			files: [
				{
					expand: true,
					cwd: 'src/',
					src: 'omni-nav.svg',
					dest: 'dist/'
				}
				// {
				// 	expand: true,
				// 	dot: true,
				// 	cwd: 'fonts/',
				// 	src: ['icomoon/*.*'],
				// 	dest: 'dist/fonts/'
				// }
		    ]
		  }
		},

		includereplace: {
			readme: {
				options: {
					suffix: ';',
					globals: {
						base_url: 'dist/omni-nav.svg',
						timestamp: Math.round(new Date().getTime() / 1000)
					}
				},
				src: 'src/index.html',
				dest: 'index.html'
			},
			readme2: {
				options: {
					suffix: ';',
					globals: {
						base_url: 'dist/omni-nav.svg',
						timestamp: Math.round(new Date().getTime() / 1000)
					}
				},
				src: 'src/index-level.html',
				dest: 'index-level.html'
			},
			dist_blogs: {
				options: {
					suffix: ';',
					globals: {
						base_url: '/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg'
					}
				},
				src: 'src/omni-nav.html',
				dest: 'dist/html/blogs.chapman.edu/omni-nav.html'
			},
			dist_inside: {
				options: {
					suffix: ';',
					globals: {
						base_url: 'asset_path(\'/assets/omni-nav.svg\')'
					}
				},
				src: 'src/omni-nav.html',
				dest: 'dist/html/inside.chapman.edu/omni-nav-NEEDS-REPLACEMENTS.html'
			},
			dist_www: {
				options: {
					suffix: ';',
					globals: {
						base_url: '/_files/img/omni-nav.svg'
					}
				},
				src: 'src/omni-nav.html',
				dest: 'dist/html/www.chapman.edu/omni-nav.html'
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['src/*.js'],
				tasks: ['uglify', 'includereplace']
			},
			css: {
				files: ['src/*.scss'],
				tasks: ['sass', 'includereplace']
			},
			svg: {
				files: ['src/omni-nav.svg'],
				tasks: ['copy']
			},
			html: {
				files: ['src/index.html', 'src/omni-nav.html'],
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