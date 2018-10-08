const path = require('path');

const rootPath = path.resolve(__dirname, '..');

// Application code
const appSrc = path.resolve(rootPath, 'src');
// Application code index
const appIndex = path.resolve(appSrc, 'index');
// Application public directory
const appPublic = path.resolve(rootPath, 'public');
// Application node_modules
const appNodeModules = path.resolve(rootPath, 'node_modules');
// Application index.html
const appHtml = path.resolve(appPublic, 'index.html');
// Application build directory
const appBuild = path.resolve(rootPath, 'dist');

module.exports = {
  rootPath: rootPath,
  appSrc: appSrc,
  appIndex: appIndex,
  appPublic: appPublic,
  appNodeModules: appNodeModules,
  appHtml: appHtml,
  appBuild: appBuild,
};
