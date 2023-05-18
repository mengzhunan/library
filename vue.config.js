const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "@nav-bar-icon-color": "#09172F",
            "@nav-bar-arrow-size": "22px",
            "@nav-bar-title-font-size": "@line-height-md",
            "@font-weight-bold": "600",
            "@divider-font-size":"12px",
            "@popup-close-icon-z-index":"9999"
          },
        },
      },
    },
  },
})