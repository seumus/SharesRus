var config = {
  entry: {a:"./src/index.js",
          b:"./src/portfolio.js"},
  output:{
    filename: "[name].js",
    path: "./build"
  },
  devtool: "source-map"
}

module.exports = config;
