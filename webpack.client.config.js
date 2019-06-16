const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const mode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/react',
            [
              '@babel/preset-env',
              {
                targets: {
                  chrome: '73',
                }
              }
            ]
          ],
          plugins: [
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true,
              }
            ]
          ]
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackTagsPlugin({
      tags: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
      ]
    })
  ]
};
