const UserService = require('../services/user-service')


function addUserRoutes(app){

    app.get('/user', (req,res) => {
        return res.json(UserService.query())
    })

}

module.exports = addUserRoutes