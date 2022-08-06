const path = require("path");
const { merge } = require('webpack-merge');

//плагины
const CleanWebpackPlugin = require('./webpack/plugins/CleanWebpackPlugin');
const DefinePlugin = require('./webpack/plugins/DefinePlugin');
const HashedModuleIdsPlugin = require('./webpack/plugins/HashedModuleIdsPlugin');
const HtmlWebpackPlugin = require('./webpack/plugins/HtmlWebpackPlugin');
const MiniCssExtractPlugin = require('./webpack/plugins/MiniCssExtractPlugin');
const CssMinimizerPlugin = require('./webpack/plugins/CSSMinimizerWebpackPlugin');
const CopyWebpackPlugin = require('./webpack/plugins/CopyWebpackPlugin');

//модули
const babelLoader = require('./webpack/modules/babelLoader');
const cssLoader = require('./webpack/modules/cssLoader');

//переменные
const build = process.env.BUILD_ENV;
const isDev = (build !== 'production');
const backendHost = isDev ? 'http://localhost:3000' : '';

const subFolder = '';

const rootFolder = __dirname;
const targetFolder = isDev ? "dist" : "prod";

const publicPath = (subFolder.trim().length == 0) ? "/" : subFolder;
const modeVal = isDev ? 'development' : 'production';
const devtoolVal = isDev ? 'source-map' : 'eval-nosources-cheap-source-map';


//-------------------------------------------------


const common = merge([{
        mode: modeVal,
        devtool: devtoolVal, //source map только для разработки
        entry: { main: path.resolve(rootFolder, 'src', 'index.js') },
        output: {
            filename: "[name].proj.js",
            chunkFilename: '[name].proj.js',
            path: path.resolve(rootFolder, targetFolder),
            publicPath: publicPath,
        },
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx"],
        },

        //Общий код
        optimization: {
            runtimeChunk: true, //выносит runtime в отдельный чанк
            splitChunks: {
                name: 'bundle',
                chunks: 'all',
                cacheGroups: {
                    styles: { //объедение чанков css в один файл
                        test: /\.css$/,
                        name: 'style',
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        }

    },
    //Общие модули и плагины
    babelLoader(),
    cssLoader(subFolder),
    CleanWebpackPlugin(),
    DefinePlugin(isDev, subFolder, backendHost),
    HashedModuleIdsPlugin(),
    HtmlWebpackPlugin(),
    MiniCssExtractPlugin(),
    CopyWebpackPlugin()
]);


//-------------------------------------------------


const devServer = merge([{ //watch сервер
    devServer: {
        historyApiFallback: true,
        static: path.resolve(rootFolder, targetFolder)
    }
}]);


//-------------------------------------------------


module.exports = function() {

    console.log(build);

    switch (build) {

        case 'development': //сборка dev
            return merge([
                common
            ]);

        case 'production': //сборка prod
            return merge([
                common,
                CssMinimizerPlugin()
            ]);

        default: //watch сервер
            return merge([
                common,
                devServer
            ]);
    }
};