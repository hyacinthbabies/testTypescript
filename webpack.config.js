
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
        {
          test: /\.js$/,
            loaders: ['babel-loader?cacheDirectory'], exclude: /node_modules/
        },
      {
        enforce: 'pre',
        test: '/\.js$/',
        loader: 'source-map-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test',
      chunksSortMode: 'dependency',
      template: './index.html'
    })
  ]
}

module.exports = config