import _ from 'underscore';

var roles = {
    roles: [
        {
            id: 0,
            name: "unathenticated",
            permissions: [
                "CAN LOGIN",
                "CAN REGISTER"
            ]
        },
        {
            id: 1,
            name: "user",
            permissions: [
                "ACCESS TEST",
                "READ TEST",
                "CAN LOGOUT"
            ]
        },
        {
            id: 2,
            name: "admin",
            permissions: []
        }
    ],
    canAccess: function (userId, permission) {
        var role = _.find(this.roles, {id: userId});
        return role.permissions.indexOf(permission) === -1 ? false : true;
    }
};

module.exports = roles;
