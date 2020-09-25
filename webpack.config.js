const webpack = require("webpack")
const path = require("path")
const externals = _externals()
module.exports = {
    mode: 'production',
    entry: './koa/src/app.js',
    output: {
        path: path.resolve(__dirname, './koa/build'),
        filename: '[name].js'
    },
    externals: externals,
    node: {
        __dirname: true
    },
    module: {
        rules: [{
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            "targets": {
                                "node": true
                            }
                        }]
                    ]
                },
            },
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    optimization: {
        minimize: true
    }
}

function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}