const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssExtractPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { resolve } = require('./util');

module.exports = {
  output: {
    filename: '[name].[chunkhash:5].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(resolve('dist')),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: false,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|css|html)($|\?)/,
    }),
  ],
  optimization: {
    //提取公共代码
    minimizer: [new TerserJSPlugin({}), new OptimizeCssExtractPlugin({})],
    namedChunks: true,
    splitChunks: {
      name: true,
    },
  },
};
