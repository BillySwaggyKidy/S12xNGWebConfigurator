// this file contains 2 webpack configurations for the development mode, one for the client and one for the server
const path = require('path');
require("core-js/stable");
require("regenerator-runtime/runtime");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
let webpack = require('webpack');

module.exports = [
  {
    name: 'client',
    mode: 'development', // we set this configuration for the developpement
    stats: {warnings:false},
    target:'web',
    entry: {
      // we take the following file:
      // - core-js a Modular standard library for JavaScript
      // - regenerator-runtime/runtime a Standalone runtime for Regenerator-compiled generator and async functions.
      // - and the Client.jsx file for the clientside of the app
      // to a js file bundle-app
      'bundle-app': ['webpack-hot-middleware/client?reload=true','core-js','regenerator-runtime/runtime','./app/clientside/Client.jsx']
    },
    output: {
      path: path.resolve(__dirname, '../build/dev/client'), // we put the bundle-app file to the dev folder of the build folder of the project
      filename: '[name].js', // each output file will have the js extension so does the bundle-app file
      publicPath: '/',
    },
    plugins: [
      // we use HtmlWebpackPlugin to generate and index.html based on the index.html from the html folder, into the server folder
      // we also for developpement don't want to minify the html
      // it will also include the bundle-app.js <script> to the head
      new HtmlWebpackPlugin({
        filename: '../server/index.html',
        template: 'app/html/index.html',
        favicon: 'app/assets/icons/cmr_group_logo.ico',
        minify: false
      }),
      new webpack.HotModuleReplacementPlugin(),
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
        // for every css file on developpement mode we will use the css-loader to convert the css to js and the style-loader to inject them in the dom of the app
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader","css-loader","postcss-loader"],
      },
      {
        // every js and jsx (React extension) files, will be load by a babel-loader witch his paramters are stated in the .babelrc file
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, '/'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      }
      ]
    },
    optimization: {
      runtimeChunk: 'single'
    },
  },
  {
    name: 'server',
    mode: 'development',
    target: 'node',
    stats: {warnings:false},
    // we exclude dependency from the node.js environnement to be present in the user's environnement
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
      path: path.resolve(__dirname, '../build/dev/server'), // we put the bundle-server file to the dev folder of the build folder of the project
      filename: '[name].js', // each output file will have the js extension so does the bundle-app file
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
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
        }
      ]
    },
    optimization: {
      runtimeChunk: 'single'
    },
  }
]