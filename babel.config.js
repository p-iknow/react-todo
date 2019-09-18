/* eslint-disable func-names */
// babel.config.js
module.exports = function(api) {
  api.cache(true);

  const presets = [['@babel/preset-env'], ['@babel/preset-react']];

  const plugins = [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    presets,
    plugins
  };
};
