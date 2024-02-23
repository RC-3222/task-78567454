const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom Calculator',
      template: 'src/index.html',
      inject: 'head',
      scriptLoading: 'defer',
    }),
  ],
}
