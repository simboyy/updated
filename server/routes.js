/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
   app.use('/api/pay', require('./api/pay'));
  app.use('/api/shippings', require('./api/shipping'));
  app.use('/api/settings', require('./api/setting'));
  app.use('/api/sendmail', require('./api/sendmail'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/PaymentMethods', require('./api/PaymentMethod'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/campaigns', require('./api/campaign'));
  app.use('/api/media', require('./api/media'));
  app.use('/api/invoices', require('./api/invoice'));
  app.use('/api/features', require('./api/feature'));
  app.use('/api/inventory', require('./api/inventory'));
  app.use('/api/keyfeatures', require('./api/keyfeature'));
  app.use('/api/statistics', require('./api/statistic'));
  app.use('/api/coupons', require('./api/coupon'));
  app.use('/api/countries', require('./api/country'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/cart', require('./api/cart'));
  app.use('/api/brands', require('./api/brand'));
  app.use('/api/brandmgs', require('./api/brandmg'));
  app.use('/api/brandtvs', require('./api/brandtv'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/wishlists', require('./api/wishlist'));
  app.use('/api/address', require('./api/address'));
  app.use('/api/users', require('./api/user'))

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
