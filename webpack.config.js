const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/containers/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/containers/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)/,
        exclude: '/node_modules',
        loader: 'babel-loader'
      },
      {
        test: /\.css?/,
        exclude: '/node_modules',
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        include: '/src',
        loader: 'eslint-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=material-design-icons/iconfont/[name].[ext]'
      }
    ]
  },
  devServer:
  {
    historyApiFallback: true
  },
  plugins: [HtmlWebpackPluginConfig,
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc'
        }
      }
    })]
};
