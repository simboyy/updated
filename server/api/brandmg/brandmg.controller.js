/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/brandmgs              ->  index
 * POST    /api/brandmgs              ->  create
 * GET     /api/brandmgs/:id          ->  show
 * PUT     /api/brandmgs/:id          ->  update
 * DELETE  /api/brandmgs/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _brandmg = require('./brandmg.model');

var _brandmg2 = _interopRequireDefault(_brandmg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Brands
function index(req, res) {
  _brandmg2.default.find(req.query).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single BrandMG from the DB
function show(req, res) {
  return brandMG.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Brand in the DB
function create(req, res) {
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if (!req.body.slug && req.body.info) req.body.slug = req.body.info.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');

  return _brandmg2.default.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing brandMG in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.uid = req.user.email; // id change on every login hence email is used
  req.body.updated = Date.now();
  if (!req.body.slug && req.body.info) req.body.slug = req.body.info.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, '');

  return brandMG.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a BrandMG from the DB
function destroy(req, res) {
  return _brandmg2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=brandmg.controller.js.map
