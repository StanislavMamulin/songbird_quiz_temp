const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './pages/main/index.js',
    quiz: './pages/quiz/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './pages/main/index.html',
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: './pages/quiz/index.html',
      filename: './quiz.html',
    }),
  ],
  mode: 'development',
  devServer: {
    compress: true,
    port: 3000,
  },
};
