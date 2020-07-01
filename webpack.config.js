/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = (env, argv) => {
  return {
    mode: env.production ? 'development' : 'production',
    devtool: env.production ? 'source-map' : 'none',
    entry: './src/handler.ts',
    target: 'node',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, 'out'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
      ],
    },
  }
};