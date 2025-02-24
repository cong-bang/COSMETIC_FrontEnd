const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@": path.resolve(__dirname, "src"),
    pages: path.resolve(__dirname, "src/pages"),
    components: path.resolve(__dirname, "src/components"),
    utils: path.resolve(__dirname, "src/utils"),
    routes: path.resolve(__dirname, "src/routes"),
    services: path.resolve(__dirname, "src/services"),
    hooks: path.resolve(__dirname, "src/hooks"),
    context: path.resolve(__dirname, "src/context"),
    images: path.resolve(__dirname, "src/assets/images")
  };
  return config;
};
