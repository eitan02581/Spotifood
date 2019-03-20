var UtilService = require('./util-service.js');
var groups = require('../data/groups.json')
_createGroups()


function query(){
    return groups
}

function _createGroups(){
    groups.forEach(group => {
        group._id = UtilService.makeId(10)
    });
}

module.exports = {
    query
}