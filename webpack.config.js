/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const slsw = require('serverless-webpack');

console.log(JSON.stringify(slsw, null, 2))

const isLocal = true

module.exports = {
  mode: isLocal ? 'development' : 'production',
  devtool: isLocal ? 'source-map' : 'none',
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
};