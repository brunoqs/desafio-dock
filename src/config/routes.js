const glob = require('glob');
const path = require('path');

module.exports = app => {
  let pathMain = path.join(__dirname, '../');
  let routePath = pathMain + 'app/modules/**/*.routes.js';
  glob.sync(routePath).forEach((file) => {
    require(file)(app);
  });
};
