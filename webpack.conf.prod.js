// this file contains 2 webpack configurations for the production mode, one for the client and one for the server
const path = require('path');
require("core-js/stable");
require("regenerator-runtime/runtime");
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = [ 
  {
    name: 'client',
    mode: 'production', // we set this configuration for the production
    stats: {warnings:false},
    target:'web',
    entry: {
      // we take the following file:
      // - core-js a Modular standard library for JavaScript
      // - regenerator-runtime/runtime a Standalone runtime for Regenerator-compiled generator and async functions.
      // - and the Client.jsx file for the clientside of the app
      // to a js file bundle-app
      'bundle-app': ['core-js','regenerator-runtime/runtime','./app/clientside/Client.jsx']
    },
    output: {
      path: path.resolve(__dirname, './build/prod/client'), // we put the bundle-app file to the prod folder of the build folder of the project
      filename: '[name].js', // each output file will have the js extension so does the bundle-app file
      publicPath: '/'
    },
    plugins:[
      // we use HtmlWebpackPlugin to generate and index.html based on the index.html from the html folder, into the server folder
      // it will also include the bundle-app.js <script> and the bundle-app.css <link> to the head
      new HtmlWebpackPlugin({
        filename: '../server/index.html',
        template: 'app/html/index.html',
        favicon: 'app/assets/icons/cmr_group_logo.ico',
      }),
      // we use MiniCssExtractPlugin to extract the CSS file from the bundle
      new MiniCssExtractPlugin({
        filename: '[name].css', chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
      {
        // for every jpg, png, svg, jpg,jpeg, gif file we will pull those into the app by using the seet/ressource build-in feature by webpack5
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        // for every type of fonts extension, we will pull those into the app by using the seet/ressource build-in feature by webpack5
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        // for every css file on developpement mode we will use the css-loader to convert the css to js and the MiniCssExtractPlugin.loader to inject them in the dom of the app
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"],
      },
      {
        // every js and jsx (React extension) files, will be load by a babel-loader witch his paramters are stated in the .babelrc files
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, '/'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      }
      ]
    },
    // this part is used to optimise the bundle for production by using the TeaserPlugin
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
        }
    }
  },
  {
    name: 'server',
    mode: 'production', // we set this configuration for the developpement
    target: 'node',
    stats: {warnings:false},
    externals: [nodeExternals()],
    entry: {
      // we take the following file:
      // - core-js a Modular standard library for JavaScript
      // - regenerator-runtime/runtime a Standalone runtime for Regenerator-compiled generator and async functions.
      // - and the server.js file for the serverside of the app
      // to a js file bundle-server in a server folder
      'bundle-server': ['core-js','regenerator-runtime/runtime','./app/serverside/server.js'],
    },
    output: {
        path: path.resolve(__dirname, './build/prod/server'), // we put the bundle-app file to the prod folder of the build folder of the project
        filename: '[name].js', // each output file will have the js extension so does the bundle-app file
        publicPath: '/'
    },
    plugins: [
    ],
    module: {
        rules: [
          {
            // for every jpg, png, svg, jpg,jpeg, gif file we will pull those into the app by using the seet/ressource build-in feature by webpack5
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            // for every type of fonts extension, we will pull those into the app by using the seet/ressource build-in feature by webpack5
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            // every js and jsx (React extension) files, will be load by a babel-loader witch his paramters are stated in the .babelrc file
            test: /\.(jsx|js)$/,
            include: path.resolve(__dirname, '/'),
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
            }]
          },
      ]
    },
    // this part is used to optimise the bundle for production by using the TeaserPlugin
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
        }
    }
  }
]