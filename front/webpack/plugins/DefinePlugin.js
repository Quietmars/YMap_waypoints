const webpack = require('webpack');

module.exports = function(isDev, subFolder, backendHost) {
    return {
        plugins: [
            new webpack.DefinePlugin({ //доступ к переменной в любой части нашего кода.
                'process.env.IS_DEV': JSON.stringify(isDev),
                'process.env.SUB_FOLDER': JSON.stringify(subFolder),
                'process.env.BACKEND_HOST': JSON.stringify(backendHost)
            })
        ]

    };
};