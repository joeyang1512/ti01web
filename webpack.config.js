const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// node命令环境变量
const NODE_ENV = process.env.NODE_ENV;
// 配置项
const pages = require('./config/pageConfig');
let devProxy;
const proxyConfigPath = './config/proxyConfig';
try {
  devProxy = (NODE_ENV === 'dev_proxy')
    ? require(proxyConfigPath)
    : {};
} catch (e) {
  console.warn(`代理配置项读取失败， 请检查${proxyConfigPath}模块是否存在`);
  throw e;
}

const outputPath = path.resolve(__dirname, 'build');


function genHtmlWebpackPlugin(pages) {
  let ret = [];
  for (let page of pages) {
    const chunksname = page.name;
    ret.push(
      new HtmlWebpackPlugin({
        title: page.title ? page.title : chunksname,
        filename: `page/${chunksname}/index.html`,
        template: `./src/page/${chunksname}/index.html`,
        minify: false,
        chunks: page.chunks || [chunksname],
      })
    );
  }
  return ret;

}

function genEntry(pages) {
  let ret = {};
  for (let page of pages) {
    const chunksname = page.name;
    ret[chunksname] = `./src/page/${chunksname}/index.js`;
  }
  return ret;
}

const entry = genEntry(pages);
const htmlWebpackPlugin = genHtmlWebpackPlugin(pages);


module.exports = {
  devtool: 'source-map',
  entry,
  output: {
    filename: 'page/[name]/index.b.js',
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      }, {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'), // 要检查的目录
        loader: 'eslint-loader',
        options: {
          // 稍稍提高一些打包速度
          // cache: true,
        }
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'page/[name]/[name].css',
    }), // 打包后的文件名
    ...htmlWebpackPlugin,
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
      ],
    }),
  ],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },

  devServer: {
    contentBase: outputPath,
    port: 8081,
    open: true,
    compress: true,
    openPage: '/page/index/index.html',
    disableHostCheck: true,
    // proxy: devProxy,
    proxy: {
      '/': {
        target: 'http://www.ti01.cn:7071/',
        changeOrigin: true
      }
    }
  },
};

/*
    {
      '/': {
        target: 'http://www.ti01.cn:7071/',
        changeOrigin: true
      }
    }
*/
