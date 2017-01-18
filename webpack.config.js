var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

var extractCSS = new ExtractTextPlugin('stylesheets/style-[hash:10].css');


var entry = PRODUCTION ?
  {
    bundle: ['./src/app.jsx'],
    vendor: [ 'react', 'react-dom']
  }
  :
  {
    js: [
      './src/app.jsx',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080'],
    vendor: ['react', 'react-dom']
  };

var plugins = PRODUCTION
  ? [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        mangle: true,
        compress: {
          warnings: false
        }
      }),
      extractCSS,
      new HTMLWebpackPlugin({
        template: 'index.html'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendors.[hash:12].min.js'
      })
    ]
  : [ new webpack.HotModuleReplacementPlugin() ];

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
);



var devtool = PRODUCTION ? '' : 'source-map';

var cssLoader = PRODUCTION
  ? extractCSS.extract({ loader: ['css-loader', 'sass-loader']})
  : ['style-loader', 'css-loader', 'sass-loader']

var config = {
  entry: entry,
  plugins: plugins,
  output: {
    filename: PRODUCTION ? 'bundle.[hash:12].min.js' : 'bundle.js',
    //filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        loader: cssLoader,
        exclude: '/node_modules/'
      }
    ]
  },

  devtool: devtool
};

module.exports = config;
