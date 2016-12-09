var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var glob = require('glob');
var entries = getEntry('./src/module/*/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
	/* ---- 生成的例子 vendors.61714a310523a3df9869.js --- */
    //filename: '[name].[hash].js'
	/* ---- 生成的例子 vendors.js?f3aaf25de220e214f84e --- */
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: { 
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test   : /\.css$/,
        loader : 'style-loader!css-loader'
      }, 
    	{
        test: /\.less$/, 
        loader: 'style!css!less'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //字体
      {
        test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks.reverse,  // chunks是需要提取的模块，reverse转换顺序后解决了一些莫名其妙的bug
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件, 放置在此目录下
    new ExtractTextPlugin('static/h5/css/[name].css')
  ]
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    
    entries[basename] = entry;
  });
  
  return entries;
}
