module.exports = {
  lintOnSave: false,
  pluginOptions: {
    quasar: {
      theme: 'mat',
      rtlSupport: true,
    },
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(() => ({
        limit: 4096,
        name: 'img/[name].[ext]',
      }));
  },
};
