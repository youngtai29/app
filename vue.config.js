const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false /*关闭语法检查*/,
  productionSourceMap: false,
  devServer: {
    //配置自动打开浏览器时的地址设置
    // host: "localhost",
    // port: 8080,
    // https: false,
    // hot: false,
    proxy: {
      "/api": {
        // 匹配所有以 '/api'开头的请求路径
        target: "http://39.98.123.211:8510", // 代理目标的基础路径
        changeOrigin: true, //一般设置(vue默认)为true,欺骗服务器，自己来自target设置的的主机和端口
        // false-----localhost:8080
        // pathRewrite: { "^/api1": "" },//不需要重写，真实的接口有该字段
      },
      "/api2": {
        // 匹配所有以 '/api2'开头的请求路径
        target: "http://localhost:5001", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api2": "" },
      },
    },

    // proxy: null,
    // 此种方式只能 配置一个代理
    // proxy: "http://localhost:5000", //开启代理服务器，把请求转发给5000端口
  },
});
