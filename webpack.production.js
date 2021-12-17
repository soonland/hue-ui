/* eslint-disable import/no-extraneous-dependencies */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'cheap-module-source-map',
});
