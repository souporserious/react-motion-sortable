var path = require('path');
var webpack = require('webpack');
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-motion-sortable.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'react-motion-sortable.js',
    sourceMapFilename: 'react-motion-sortable.sourcemap.js',
    library: 'Sortable',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)/, loader: 'babel?stage=0'}
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': 'React',
    'react-motion': 'ReactMotion'
  },
};

if(TARGET === 'minify') {
  config.output.filename = 'react-motion-sortable.min.js';
  config.output.sourceMapFilename = 'react-motion-sortable.min.js';
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'Spring', 'Sortable']
    }
  }));
}

module.exports = config;