const GroupService = require('../services/group-service')


function addGroupRoutes(app){

    app.get('/group', (req, res) => {
        return res.json(GroupService.query())
    })

}

module.exports = addGroupRoutes