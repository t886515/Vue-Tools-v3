module.exports = {
  lintOnSave: false,
  pluginOptions: {
    quasar: {
      theme: 'mat',
    },
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
