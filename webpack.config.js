const path = require('path');

const config = {
  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom', 'prop-types', 'axios', 'lodash.debounce', 'lodash.pickby'],
    app: ['./lib/renderers/dom.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2'],
          }
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'lib'), 'node_modules'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
