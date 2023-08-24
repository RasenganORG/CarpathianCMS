const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/calendar01/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'calendar01',
      filename: 'remoteEntry.js',
      exposes:{
        './Calendar01App':'./src/bootstrap'
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
