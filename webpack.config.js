const { merge } = require('webpack-merge');
const webpackDevConfig = require('./webpack.dev');
const webpackCommonConfig = require('./webpack.common');
const webpackProdConfig = require('./webpack.prod');

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(webpackCommonConfig, webpackDevConfig);
    case 'production':
      return merge(webpackCommonConfig, webpackProdConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
