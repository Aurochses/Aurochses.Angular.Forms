const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {
    '@angular/common': 'ng.common',
    '@angular/core': 'ng.core',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/material': 'ng.material',
    '@angular/platform-browser': 'ng.platformBrowser'
};

export default {
    input: 'dist/packages-dist/forms/esm5/forms.js',
    output: {
        file: 'dist/packages-dist/forms/bundles/forms.umd.js',
        format: 'umd',
        name: 'ng.forms',
        exports: 'named',
        plugins: [resolve(), sourcemaps()],
        external: Object.keys(globals),
        globals: globals
    }
};