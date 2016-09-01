var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./javascript/m_application.jsx",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ],
  },
  devtool: 'source-maps'
};
