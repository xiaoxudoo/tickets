var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var glob = require('glob');

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin(['../dist']), //清空生成目录
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
})

function getEntry(globPath) {
  var entries = {},
      basename;

  glob.sync(globPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
     
      entries[basename] = entry;
  });
  console.log(entries);
  return entries;
}

var pages = getEntry('./src/module/*/*.html');

for (var pathname in pages) {

	
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: 'h5/'+ pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true              // js插入位置

  };
  

  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }
  
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}


















