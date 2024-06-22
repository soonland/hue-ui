/* eslint-disable import/no-extraneous-dependencies */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint global-require: 0 */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    liveReload: true, // refreshes the page on change
    watchFiles: ['src/**/*.js', 'src/**/*.css'],
    open: false,
    port: 9080,
    historyApiFallback: {
      index: '/', // used for routing (404 response), and address bar routing
    },
    // before: function setupAuth(server) {
    //   auth.setupAuthCode(server);
    //   server.use(auth.isAuthenticated({ failureRedirect }), auth.isAuthorized('session', 'create'));
    //   server.use('/policies', auth.isAuthenticated(), auth.isAuthorized('session', 'create'), permit);
    // },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // server mode displays report
    }),
  ],
  devtool: 'cheap-module-source-map',
});
