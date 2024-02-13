const path=require('path');
const MinifyPlugin=require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
module.exports={
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: ['./main.js','./main.css'],
    output:{
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
            test: /.(scss|css)$/,
            exclude: /node_modules/,
            use:[
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }
        ]
    },
    plugins:[
        new MinifyPlugin({},{
            comments: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}