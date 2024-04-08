const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // no check
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "DBProxy";
        return args;
      })
  },
})
