/**
 * ACL Initialization
 */
var nodeAcl = require('acl');

module.exports = function( mongoose, config ) {
  var db = mongoose.connection.db,
    backed = new nodeAcl.mongodbBackend(db, 'acl'),
    acl = new nodeAcl(backed);

  // anonymous is allowed to access application, menus, signup and signin
  acl.allow('anonymous', ['application', 'navigationnode', 'signup', 'signin'], 'view', function(err) {
    if (err) {
      throw new Error(err);
    }
  });

  // members can view user list and logout
  acl.allow('member', ['application', 'navigationnode', 'logout', 'user'], 'view', function(err) {
    if (err) {
      throw new Error(err);
    }
  });

  // admin can edit everything
  acl.allow('administrator', ['application', 'navigationnode', 'user', 'service', 'logout'], ['edit', 'view', 'delete'],
    function(err) {
      if (err) {
        throw new Error(err);
      }
    });

  acl.addUserRoles('tbudiman', 'administrator', function (err) {
    if (err) {
      throw new Error(err);
    }
  });

};
