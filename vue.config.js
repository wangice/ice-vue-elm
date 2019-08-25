// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
// const tsImportPluginFactory = require('ts-import-plugin');
// const merge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    configureWebpack: {
		devtool: 'source-map'
	},
    // baseUrl  type:{string} default:'/' 
    // 将部署应用程序的基本URL
    // 将部署应用程序的基本URL。
    // 默认情况下，Vue CLI假设您的应用程序将部署在域的根目录下。
    // https://www.my-app.com/。如果应用程序部署在子路径上，则需要使用此选项指定子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，集baseUrl到'/my-app/'.
    publicPath: "./",

    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'

    // outputDir: 'dist',
    // outputDir: '../resources/static',

    // pages:{ type:Object,Default:undfind }

    //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    // assetsDir: "static",
    
    // baseUrl: './',
    // assetsPublicPath: './',
    // css的处理
    css: {
        // 当为true时，css文件名可省略 module 默认为 false
        modules: false,
        // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
        // 默认生产环境下是 true，开发环境下是 false
        extract: false,
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: false,
        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {
            css: {},
            less: {},
            // sass: {
            // 全局注入通用样式
            // data: fs.readFileSync('./src/assets/variables.scss', 'utf-8')
            // }
        }
    },
    /*
      构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
      个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
      的字符串，
      注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
    */
    // pages: {
    // index: {
    // entry for the page
    // entry: 'src/index/main.js',
    // the source template
    // template: 'public/index.html',
    // output as dist/index.html
    // filename: 'index.html'
    // },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // },

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: false,
    // productionSourceMap：{ type:Bollean,default:true } 生产源映射
    // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
    productionSourceMap: false,
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项

    devServer: {
        port: 9807, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        // proxy: {
        //     '/test': {
        //         // target: 'http://119.139.198.3:8100/',
        //         // ws: true,
        //         // changeOrigin: true
        //         pathRewrite: { 
        //             '^/test': ''  // 路径重写，第一个与上面相同，第二个/queue-admin 为server.context-path（服务器的上下文）
        //         },
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //         Referer: 'http://119.139.198.3:8100/'
        //         }
        //     },
            // '/foo': {
            //     target: '<other_url>'
            // }
        // },  // 配置多个代理
    },
    pluginOptions: {

    }
};
