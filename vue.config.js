// 后端请求地址 注意[他会根据你环境的不同从而获取的 env 文件不同]
const target = process.env.VUE_APP_SERVICE_URL;
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'//生产环境，路径为网站的子路径
        : '/',//开发环境下
    //publicPath: './', //打包到tomcat中要设置公共路径，要不会找不到会打开空页面
    //publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */ 
    /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
    //publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    // outputDir: 'dist',
    // /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    // assetsDir: "assets",
    // /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    // productionSourceMap: false,
    // /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    // filenameHashing: false,
    // /* 代码保存时进行eslint检测 */
    // lintOnSave: true,
    // /* webpack-dev-server 相关配置 */
    
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: {
             [process.env.VUE_APP_BASE_API]: {
                 target: target,
                 ws: true,
                 changeOrigin: true,
                 pathRewrite: {
                     ['^'+process.env.VUE_APP_BASE_API]: '/' + process.env.VUE_APP_BASE_API
                   }
             },
            '/api': {
                target: '127.0.0.1',
                ws: true,
                changeOrigin: true,
            },
            '/bshm_edj': {
                target: 'http://localhost:8086',
                changeOrigin: true,
                pathRewrite: {
                     '^/bshm_edj': '/bshm_edj'
                   }
            },
            '/bshm_404': {
                target: 'http://localhost:8086',
                changeOrigin: true,
                pathRewrite: {
                     '^/bshm_404': '/bshm_404'
                   }
            },
            //  '/api': {
            //      target: 'http://api.qingyunke.com',
            //      ws: true,
            //      changeOrigin: true
            //  }
            
        }
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // }
    },
  }
