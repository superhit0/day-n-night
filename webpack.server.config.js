const mode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';

module.exports = {
  mode,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: '8.10',
                },
              },
            ],
          ],
          plugins: [
            'transform-es2015-modules-commonjs'
          ]
        }
      }
    ]
  }
};
