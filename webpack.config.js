const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/scss/main.scss'],
  output: {
    filename: './dist/app.min.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtract.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtract({
      filename: './dist/style.min.css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJS({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssets({})
    ]
  }
};
