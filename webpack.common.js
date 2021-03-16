const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('./util');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const { DefinePlugin } = webpack;

const miniCssExtractConfig = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '/',
    hmr: !IS_PRODUCTION,
    reloadAll: true,
  },
};

const defaultHtmlOption = {
  title: 'test clipboard',
  favicon: resolve('logo.png'),
  inject: 'body',
};

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/main.js'],
  },
  output: {
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          miniCssExtractConfig,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractConfig,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [miniCssExtractConfig, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 3000,
            name: 'imgs/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'font/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.(mp3)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'video/[name].[hash:7].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [resolve('../node_modules')],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': 'src',
    },
  },
  plugins: [
    new DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: IS_PRODUCTION ? '[name].[chunkhash:5].css' : '[name].css',
      chunkFilename: IS_PRODUCTION
        ? '[name].[chunkhash:5].chunk.css'
        : '[name].chunk.css',
      ignoreOrder: true,
      moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`,
    }),
    new HtmlWebpackPlugin({
      ...defaultHtmlOption,
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],
  optimization: {
    splitChunks: {
      maxInitialRequests: 10,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
};
