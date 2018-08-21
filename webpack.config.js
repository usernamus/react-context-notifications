const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.entry = './example/index.js';
    config.plugins = [new HtmlWebpackPlugin({
      template: './example/index.html',
    })];
  }

  return config;
};
