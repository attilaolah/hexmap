const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./ts/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", "tsx", ".js"]
  },
  devtool: "source-map",
  plugins: [],
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  externals: {
    babylonjs: "BABYLON",
  },
};
