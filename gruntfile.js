module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*')
        .forEach(function(d) {
            var tasks = grunt.file.expand('./node_modules/' + d + '/tasks');

            if (tasks.length > 0) {
                tasks.forEach(grunt.loadTasks);
            }
            else {
                tasks = grunt.file.expand('../../../node_modules/' + d + '/tasks');

                if (tasks.length > 0) {
                    tasks.forEach(grunt.loadTasks);
                }
            }
        });

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            ts: {
                build: {
                    src: ["*.ts","api/**/*.ts", "!node_modules/**/*.ts"],
                    // Avoid compiling TypeScript files in node_modules
                    options: {
                        module: 'commonjs',
                        // To compile TypeScript using external modules like NodeJS
                        fast: 'never'
                        // You'll need to recompile all the files each time for NodeJS
                    }
                }
            }
        });
    
        // Define aliases
        grunt.registerTask('default', ['ts:build']);
        grunt.registerTask('build', ['ts:build']);
        grunt.registerTask('compile', ['ts:build']);
};