const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        entry: './src/MicroEventBus.js',
        output: {
            filename: 'MicroEventBus.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'production',
        plugins: [
            new copyWebpackPlugin({
                patterns: [
                    {
                        from: "src/MicroEventBus.d.ts",
                        to: "MicroEventBus.d.ts"
                    },
                    {
                        from: "src/index.html",
                        to: "index.html"
                    }
                ]
            })
        ]
    }

];