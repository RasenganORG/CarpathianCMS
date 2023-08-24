const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        calendar_generated:`calendar_generated@${domain}/calendar_generated/latest/remoteEntry.js`,
        calendar01: `calendar01@${domain}/calendar01/latest/remoteEntry.js`
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

