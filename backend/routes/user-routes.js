const UserService = require('../services/user-service')


function addUserRoutes(app){

    app.get('/user', (req,res) => {
        return res.json(UserService.query())
    })
<<<<<<< HEAD
=======

    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId
        UserService.getById(userId)
            .then(user => {
                console.log('user by id got', user)
                res.json(user)
            })
    })
>>>>>>> 17f2cd20d5be0b1b5ee7a7da19f2c9ae8e6c17f9
}

module.exports = addUserRoutes