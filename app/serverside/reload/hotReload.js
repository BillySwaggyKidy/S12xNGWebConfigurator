import chokidar from 'chokidar';
import path from 'path';

export const enableHMR = (server) => { // enable the server hot reload


  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware'); // we use webpack-dev-middleware, An express-style development middleware for use with webpack bundles and allows for serving of the files emitted from webpack
  const webpackHotMiddleware = require('webpack-hot-middleware'); // webpack-hot-server is use to add hot reloading into an existing server without webpack-dev-server.
  
  const config = require('../../../webpack.conf.dev.js'); // we get the webpack config for devlopment
  const compiler = webpack(config); // we create a compiler from it

  server.use(webpackDevMiddleware(compiler, {
      serverSideRender: true,
  })); // we tell the express server to use webpackDevMiddleware for the client and server config from the webpack config in SSR mode
  server.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client'))); // we demand to enable the hot reloading onlly for the client config of the webpack config

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!

  const watcher = chokidar.watch(path.resolve(__dirname,"../routers"));
  watcher.on('ready', () => {
      console.log("!!!!! Server reload ready !!!!")
      watcher.on('all', (event, path) => {
        let cacheModuleKeys = Object.keys(require.cache).filter((id)=>{
          const localId = id.substring(process.cwd().length);
          return /[\/\\]routers[\/\\]/.test(localId);
        });
        console.log("|| || || || [Number of cache seen by the forEach: " + cacheModuleKeys.length + " || || || ||")
        cacheModuleKeys.forEach(function(id) {
          delete require.cache[id];
        });
      });
  });
    
  // Do "hot-reloading" of react stuff on the server
  // Throw away the cached client modules and let them be re-required next time
  compiler.hooks.done.tap('done', (stats) => {
      console.log("????? Clearing /client/ module cache from server ??????");
      let cacheModuleKeys = Object.keys(require.cache).filter((id)=>{
        const localId = id.substring(process.cwd().length);
        return /[\/\\]client[\/\\]/.test(localId);
      });
      console.log("|| || || || [Number of cache seen by the forEach: " + cacheModuleKeys.length + " || || || ||")
      cacheModuleKeys.forEach(function(id) {
        delete require.cache[id];
      });
  })
};