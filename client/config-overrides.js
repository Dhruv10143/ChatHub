module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      console: require.resolve("console-browserify")
    };
    return config;
  };