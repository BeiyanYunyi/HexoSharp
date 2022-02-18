/* 
  Deprecated, just a backup.
*/

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  entry: {
    worker: { import: './src/worker/index.ts' },
    frontend: { import: './src/frontend/main.tsx' },
  },
  output: {
    filename: (pathdata) => `${pathdata.chunk!.name!}.js`,
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['frontend'],
      template: './src/frontend/index.html',
      inject: 'body',
      favicon: './src/frontend/favicon.svg',
      title: 'Hexo #',
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      // { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true } },
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          // transpileOnly is useful to skip typescript checks occasionally:
          // transpileOnly: true,
          loader: 'tsx',
          target: 'es2015',
        },
      },
    ],
  },
};

export default config;
