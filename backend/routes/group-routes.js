const GroupService = require('../services/group-service')


function addGroupRoutes(app){

    app.get('/group', (req, res) => {
        GroupService.query()
            .then(groups => {
                console.log('answer from query', groups)
                return res.json(groups)
            })
    })

}

module.exports = addGroupRoutes