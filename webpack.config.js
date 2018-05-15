const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
  entry: "./src/index.js",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: __dirname + "/build"
  },
  resolve: {
    extensions: [".webpack.js", ".js"],
    modules: ["node_modules", "web_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")]
      },
      {
        enforce: "pre",
        test: "/.js$/",
        loader: "source-map-loader"
      },
      {
        test: /\.(jpg|png|gif|svg|woff|eot|ttf)\??.*$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "test",
      chunksSortMode: "dependency",
      template: "./index.html"
    })
  ]
};

module.exports = config;
