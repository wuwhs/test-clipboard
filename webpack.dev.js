module.exports = {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
    ],
  },
  devServer: {
    port: 8088,
    host: 'localhost',
    open: true,
    proxy: {},
  },
  optimization: {
    namedChunks: true,
    splitChunks: {
      name: true,
    },
  },
};
