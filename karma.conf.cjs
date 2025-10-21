// karma.conf.cjs
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.js': ['esbuild'],
      'src/**/*.spec.jsx': ['esbuild']
    },
    esbuild: {
      jsx: 'automatic',
      target: 'es2020',
      sourcemap: 'inline',
      define: { 'process.env.NODE_ENV': '"test"' },
      loader: { '.js': 'jsx', '.jsx': 'jsx' } // permite JSX también en .js
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    client: { jasmine: { random: false } }
  })
}
