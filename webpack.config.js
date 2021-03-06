//
// Webpack documentation is fairly extensive, 
// just search on https://webpack.js.org/
//
// Be careful: there are a lot of outdated examples/samples,
// so always check the official documentation!
//

// Plugins
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Options
const buildMode = process.env.NODE_ENV || 'development';
const sourcemapsMode = buildMode !== 'production' ? 'eval-source-map' : undefined;
const dist = `${__dirname}/www/`;

//
// Configuration:
// This configuration is still relatively minimalistic; 
// each section has many more options
//
module.exports = {
    // List all the JS modules to create
    // They will all be linked in the HTML page
    entry: {
        app: './build.hxml'
    },
    // Generation options (destination, naming pattern,...)
    output: {
        path: dist,
        filename: '[name].[chunkhash:7].js'
    },
    // Module resolution options (alias, default paths,...)
    resolve: {
        extensions: ['.js', '.json']
    },
    // Sourcemaps option for development
    devtool: sourcemapsMode,
    // Live development server (serves from memory)
    devServer: {
        contentBase: dist,
        compress: true,
        port: 9000,
        overlay: true
    },
    // List all the processors
    module: {
        rules: [
            // Haxe loader (through HXML files for now)
            {
                test: /\.hxml$/,
                loader: 'haxe-loader',
                options: {
                    // Additional compiler options added to all builds
                    extra: `-D build_mode=${buildMode}`
                }
            },
            // Static assets loader
            // - you will need to adjust for webfonts
            // - you may use 'url-loader' instead which can replace
            //   small assets with data-urls
            {
                test: /\.(gif|png|jpg|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:7].[ext]'
                }
            },
            // CSS processor/loader
            // - this is where you can add sass/less processing,
            // - also consider adding postcss-loader for autoprefixing
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    // Plugins can hook to the compiler lifecycle and handle extra tasks
    plugins: [
        // Like generating the HTML page with links the generated JS files
        new HtmlWebpackPlugin({
            title: 'Webpack + Haxe example'
        })
        // You may want to also:
        // - minify/uglify the output using UglifyJSPlugin, 
        // - extract the small CSS chunks into a single file using ExtractTextPlugin
        // - inspect your JS output weight using BundleAnalyzerPlugin
    ],
};
