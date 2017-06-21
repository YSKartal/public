module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffeelint: {
            options: {
                no_empty_param_list: {
                    level: 'error'
                },
                max_line_length: {
                    value: 100,
                    level: 'warn'
                }
            },
            src: ['lib/*.js'],
            //test: ['spec/*.js']
        },
        shell: {
            test: {
                command: 'apm test',
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-atomdoc');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.registerTask('clean', function() { return require('rimraf').sync('lib'); });
    grunt.registerTask('lint', ['coffeelint:src', 'coffeelint:test']);
    grunt.registerTask('test', ['shell:test']);
    return grunt.registerTask('default', ['lint', 'test', 'atomdoc']);
};