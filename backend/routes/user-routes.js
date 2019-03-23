const UserService = require('../services/user-service')


function addUserRoutes(app) {

    // login
    app.post('/user/login', (req, res) => {
        const userInfo = req.body
        console.log('first', userInfo);

        UserService.login(userInfo)
            .then(user => {
                console.log('after ', user);
                req.session.user = user
                if (user) {
                    var userToReturn = { ...user }
                    delete userToReturn.password
                }
                res.json(userToReturn)
                // }).catch((err) => res.status(500).send('Wrong Credentials'))
            }).catch((err) => res.status(401).send(err))
    })

    // signup
    app.post('/user/signup', (req, res) => {
        const newUserInfo = req.body
        UserService.addUser(newUserInfo)
            .then(user => {
                console.log('asdas', user);

                return res.json(user)
            })
    })

    app.get('/user', (req, res) => {
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