'use strict';

/**
 * Module dependencies
 */
var adminPolicy = require('../policies/admin.server.policy'),
  admin = require('../controllers/admin.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(adminPolicy.isAllowed, admin.list);

  // Admin routes for approving a new user
  app.route('/api/unapproved')
    .get(adminPolicy.isAllowed, admin.unapprovedList)
    .post(adminPolicy.isAllowed, admin.changeToAccepted)
    .delete(adminPolicy.isAllowed, admin.deleteApplicant);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Admin routes for applying a new user.
  app.route('/api/add')
    .post(adminPolicy.isAllowed, admin.adminsignup);
  
  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
