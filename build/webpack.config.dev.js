'use strict';

/**
 * Created by x on 11/23/15.
 */
var path = require('path');

/**
 * 导入文件入口
 * @type {{index: string, details: string}|exports|module.exports}
 */
var webpack = require('webpack');
//提取公用CSS
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../');
var utils= require('./utils');
var pageEntry=utils.pageEntry();
var entries = getEntry(pageEntry);
var config = {
    //pathToBuild: pathToBuild,
    devtool: "source-map",
    //入口文件配置
    entry:entries,
    /***
     * 输出文件配置{path是指文件的输出绝对路径,publicPath:编译文件指向的访问路径} 
     * path + publicPath 列子:http://127.0.0.1:8989/index.html
     **/
    output: {
        path: path.resolve(projectRoot, 'www'),
        chunkFilename: '[name].js',
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                loader: 'babel-loader',
                include: [path.resolve(projectRoot, 'src'),path.resolve(projectRoot,'node_modules/vue-echarts-v3/src')]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
           {
               test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query:{limit:'100'}
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: [".js",".vue"], //当requrie的模块找不到时，添加这些后缀
         //设置别名
        alias:{
             "@utilities": path.resolve(projectRoot,'src/utilities/')
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {from:projectRoot+'/static',to:projectRoot+"/www/static"}
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js"
        }),
        /**
         * 组件热刷新
         */
        new webpack.HotModuleReplacementPlugin(),
    ]
};
function getEntry(globPath) {
    var entry = {};
    entry['common']=["vue", "vuex", "axios", "vue-router", "iview"];
    globPath.forEach(function (item) {
        let pathname = `${item.name}/index`; // 正确输出js和html的路径
        entry[pathname] =[path.resolve(projectRoot, item.path)];
    });
    return entry;
}


pageEntry.forEach(function (pathname) {
// 配置生成的html文件，定义路径等
    var conf = {
        title:pathname.name,
        filename: `${pathname.name}.html`,
        addLinkCss: ['/static/styles/iview.css'],
        template: `./template/${pathname.name}/index.ejs`,
        hash: true,    //为静态资源生成hash值
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunks: ['common', `${pathname.name}/index`],
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;
