// inspiration: https://github.com/ngbp/ngbp/blob/v0.3.1-release/Gruntfile.js

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),


        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n * <%= pkg.homepage %>\n *\n * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n */\n'
        }, // meta


        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            files: [
                'public/assets/css/plugins.css',
                'public/assets/css/app.css',

                'public/assets/js/plugins.js',
                'public/assets/js/app.js'
            ]
        }, // clean


        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.)
         */
        // @TODO
        copy: {
            // plugins: {
            //     files: [
            //         {
            //             src: [
            //                 'public/packages/'
            //             ],
            //             dest: 'public/assets/',
            //             cwd: '.',
            //             expand: true
            //         }
            //     ]
            // }, // plugins

            // main: {
            //     files: [
            //         {
            //             src: [ 'app/' ],
            //             dest: 'public/assets/',
            //             cwd: '.',
            //             expand: true,
            //             flatten: true
            //         }
            //     ]
            // } // main
        }, // copy

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         * We use it to prepare files in dev statement
         */
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },

            plugins: {
                src: [
                    'public/packages/jquery/jquery.js',
                    'public/packages/bootstrap/dist/js/bootstrap.js',
                    'public/packages/angular/angular.js',
                    'public/packages/angular-ui/angular-ui.js',
                    'public/packages/angular-ui-bootstrap/dist/ui-bootstrap-0.9.0.js',
                    'public/packages/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.9.0.js',
                ],
                dest: 'public/js/plugins.js'
            }, // plugins

            main: {
                options: {
                    banner: '<?= meta.banner %>\n\n(function (window, angular, undefined) {',
                    footer: '}) (window, window.angular);'
                },
                src: [
                    'app/angular/services.js',
                    'app/angular/controllers.js',
                    'app/angular/filters.js',
                    'app/angular/models.js',
                    'app/angular/directives.js',
                    'app/angular/app.js'
                ],
                dest: 'public/js/app.js'
            } // main
        }, // concat


        /**
         * `ng-min` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        // @TODO
        ngmin: {
            // compile: {
            //     files: [
            //         {
            //             src: [''],
            //             cwd: '',
            //             dest: '',
            //             expand: true
            //         }
            //     ]
            // }
        }, // ngmin


        /**
         * Minify the sources!
         */
        uglify: {
            plugins: {
                options: {
                    banner: ''
                },
                files: {
                    'public/js/plugins.js': [
                        'public/packages/jquery/jquery.js',
                        'public/packages/bootstrap/dist/js/bootstrap.js',
                        'public/packages/angular/angular.js',
                        'public/packages/angular-ui/angular-ui.js',
                        'public/packages/angular-ui-bootstrap/dist/ui-bootstrap-0.9.0.js',
                        'public/packages/angular-ui-bootstrap/dist/ui-bootstrap-tpls-0.9.0.js',
                    ]
                }
            }, // plugins

            main: {
                options: {
                    banner: '<%= meta.banner %>\n\n(function (window, angular, undefined) {',
                    footer: '}) (window, window.angular);',
                },
                files: {
                    'public/js/app.js': [
                        'app/angular/services.js',
                        'app/angular/controllers.js',
                        'app/angular/filters.js',
                        'app/angular/models.js',
                        'app/angular/directives.js',
                        'app/angular/app.js',
                    ]
                }
            } // main
        }, // uglify


        /**
         * `recess` handles our LESS compilation and uglification automatically.
         */
        recess: {
            plugins: {
                options: {
                    compile: true,
                    compress: true
                },
                files: {
                    'public/css/plugins.css': [
                        'public/packages/bootstrap/dist/css/bootstrap.css',
                        'public/packages/angular-ui/angular-ui.css',

                        'app/less/plugins.less'
                    ]
                }
            }, // plugins

            main: {
                options: {
                    banner: '<%= meta.banner %>',
                    compile: true,
                    compress: true
                },
                files: {
                    'public/css/app.css': [
                        'app/less/app.less'
                    ]
                }
            } // main
        }, // recess


        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. This file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/angular/*.js',
                'app/js/*.js',
                '!public/js/*.js'
            ],
            globals: {}
        }, // jshint


        // @TODO
        watch: {
            // options: {
            //     livereload: true
            // },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            // gruntfile: {
            //     files: 'Gruntfile.js',
            //     tasks: [ 'jshint:gruntfile' ],
            //     options: {
            //         livereload: false
            //     }
            // },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            // less: {
            //     files: [
            //         'app/less/*.less'
            //     ],
            //     tasks: ['recess', 'shell:done']
            // },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            // js: {
            //     files: [
            //         '<%= jshint.all %>'
            //     ],
            //     tasks: [/*'jshint',*/ 'uglify', 'shell:done']
            // }
        }, // watch


        shell: {
            done: {
                command: 'terminal-notifier -message "Bazinga! Grunt tasks done!" -title "Gruntfile.js" -sound Pop'
            }
        }, // shell


        connect: {
            server: {
                options: {
                    port: 8800,
                    base: '.'
                }
            }
        }, // connect
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-shell');

    // @TODO
    // grunt.event.on('watch', function(action, filepath, target) {
    //     grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    // });


    // // -- Tasks

    // grunt.registerTask('before-test', [
    //     'clean'
    // ]);
    // grunt.registerTask('test', [
    //     'recess',
    //     'concat'
    // ]);
    // grunt.registerTask('prod', [
    //     'recess',
    //     'uglify'
    // ]);
    // grunt.registerTask('after-test', [
    //     'shell:done'
    // ]);

    // grunt.registerTask('js', [
    //     'concat',
    //     'shell:done'
    // ]);
    // grunt.registerTask('css', [
    //     'recess',
    //     'shell:done'
    // ]);

    // grunt.registerTask('dev', [
    //     'connect',
    //     'watch'
    // ]);

    // grunt.registerTask('default', ['before-test', 'prod', 'after-test']);
};
