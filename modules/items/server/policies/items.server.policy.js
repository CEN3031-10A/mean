'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Items Permissions
 pull Technician out and make them only delete
 make permissions as closed off as possible, admin gets everything and technician is only one to delete.
 test with a technician account
 */
exports.invokeRolesPolicies = function () {
//Attempting to make it more closed off so specific roles handle functions    
  acl.allow([{
    roles: ['admin'], //Only the Admin  should be able to create, read, update, and delete items.
    allows: [{
      resources: '/api/items',
      permissions: '*'
    }, {
      resources: '/api/items/:itemId',
      permissions: '*'
    }]
  }, 
  {
    roles: ['ta'],
    allows: [{
      resources: '/api/items',
      permissions: ['get']
    }, {
      resources: '/api/items/:itemId',
      permissions: ['get','post','put'] //TA's can modify and create items but not delete them from the database.
    }]
  }, 
  {
    roles: ['technician'],
    allows: [{
      resources: '/api/items',
      permissions: ['get']
    }, {
      resources: '/api/items/:itemId',
      permissions: ['get', 'delete'] //Technician deleteing items 
    }]
  }
])
};

/**
 * Check If Items Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  //If a user is not yet an approved user, do not allow any changes to be made on the database.
  if(!req.user || !req.user.approvedStatus) {
    return res.status(403).json({
      message: 'User is not yet approved for database changes (check attribute approvedStatus)'
    });
  }

  // If an item is being processed and the current user created it then allow any manipulation
  if (req.item && req.user && req.item.user && req.item.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
