const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [`${__dirname}/src/scss`],
              data: `@import 'variables';`
            }
          }
        ]
      },
      {
        test: /\.(svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/asset/favicon.ico'
    }),
    new DefinePlugin({
      FetchUrl: JSON.stringify(
        'https://h3rb9c0ugl.execute-api.ap-northeast-2.amazonaws.com/develop/todolist'
      ),
      ImgURL: JSON.stringify(
        'https://lh3.googleusercontent.com/5CNo4tlDYDJ2N8qyRoLlTKEx7CvuCSdr-iiSaQob5EGRGrvy9QFnX0HufdPGRHWuq7-v'
      )
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    inline: true
  }
};
