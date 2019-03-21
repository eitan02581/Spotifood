const UserService = require('../services/user-service')


function addUserRoutes(app){

    app.get('/user', (req,res) => {
        return res.json(UserService.query())
    })

    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId
        UserService.getById(userId)
            .then(user => {
                console.log('user by id got', user)
                res.json(user)
            })
    })
}

module.exports = addUserRoutes