/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  // entry: ['@babel/polyfill', './src/index.js'], // useless?
  output: {
    path: path.resolve(__dirname, `dist/${env}`),
    filename: '[name]-[fullhash].js',
    publicPath: '/', // used for routing
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      helpers: path.resolve(__dirname, './src/helpers'),
      constants: path.resolve(__dirname, './src/constants'),
      config: path.resolve(__dirname, './src/config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true, // cache busting
      template: 'public/index.html',
    }),
    // creates a separate style.css file instead of adding the styles to the bundle.js
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/server', to: 'server' },
        /* { from: 'src/lib', to: 'lib' },*/
      ],
    }),
  ],
};
