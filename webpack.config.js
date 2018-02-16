// webpack.config.js
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', path.resolve('src', 'index.js')],
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dest`,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    contentBase: 'dest',
  },
};
