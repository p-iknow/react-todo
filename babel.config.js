// babel.config.js
module.exports = function(api) {
  api.cache(true);

  const presets = [['@babel/preset-env'], ['@babel/preset-react']];

  const plugins = ['react-hot-loader/babel'];

  return {
    presets,
    plugins
  };
};
