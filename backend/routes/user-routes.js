const UserService = require('../services/user-service')


function addUserRoutes(app) {

    // login
    app.post('/user/login', (req, res) => {
        const userInfo = req.body
        UserService.login(userInfo)
            .then(user => {
                req.session.user = user
                if (user) {
                    var userToReturn = { ...user }
                    delete userToReturn.password
                }
                res.json(userToReturn)
            }).catch((err) => res.status(401).send(err))
    })

    // signup
    app.post('/user/signup', (req, res) => {
        const newUserInfo = req.body
        UserService.addUser(newUserInfo)
            .then(user => {
                return res.json(user)
            })
    })

    app.get('/user', (req, res) => {
        return res.json(UserService.query())
    })

    app.put('/user/addGroup/:userId', (req, res) => {
        const ids = req.body;
        UserService.addGroupToUser(ids)
            .then(() => {
                // console.log('successfuly added group to user')
                return res.json()
            })
    })

    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId
        UserService.getById(userId)
            .then(user => {
                res.json(user)
            })
    })

    app.post('/user/:userId', (req, res) => {
        const userId = req.params.userId
        const updatedUser = req.body
        UserService.updateUser(updatedUser)
            .then(() => {
                res.json()
            })
    })
}

module.exports = addUserRoutes