const { unauthorized, badRequest } = require('./AppResponse');

const grantRoleAccess = {};

grantRoleAccess.createStuffs = (req, res, next) => {
    const userRole = req.user.role;
    const allowedRoles = ['admin', 'superAdmin'];

    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        return unauthorized(res, null, "You don't have permission to perform this action.");
    }
};

grantRoleAccess.updateStuffs = (req, res, next) => {
    const userRole = req.user.role;
    const allowedRoles = ['admin', 'superAdmin'];

    if (allowedRoles.includes(userRole)) {
        next();
    } else {
        return unauthorized(res, null, "You don't have permission to perform this action.");
    }
};

module.exports = grantRoleAccess;