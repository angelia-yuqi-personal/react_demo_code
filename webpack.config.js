const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), //项目的起点入口

  //项目输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  module: {
    //模块加载
    rules: [
      {
        test: /\.css$/, //匹配规则
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, //小于8192B的文件转为base64文件
            name: 'static/images/[name].[hash:5].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    //插件配置
    new CleanWebpackPlugin(['dist']), //清空编译输出文件夹
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'), //模板
      filename: 'index.html'
    }) //生成Html5文件
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};
