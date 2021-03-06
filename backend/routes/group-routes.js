const GroupService = require('../services/group-service')
const UserService = require('../services/user-service')
const ObjectId = require('mongodb').ObjectId;

function addGroupRoutes(app, io) {
    app.get('/group', (req, res) => {
        const filterBy = req.query
        GroupService.query(filterBy)
            .then(groups => res.json(groups))
    })

    app.get('/group/:groupId', (req, res) => {
        let groupId = req.params.groupId
        GroupService.getById(groupId)
            .then(group => {
                res.json(group)
            })
    })

    app.post('/group', (req, res) => {
        let group = req.body
        console.log('group to add in route is', group)
        GroupService.add(group)
            .then(updatedGroup => {
                res.json(updatedGroup)
            })
    })

    app.delete('/group/:groupId/:recipeId', (req, res) => {
        const grouopId = req.params.groupId;
        const recipeId = req.params.recipeId
        GroupService.removeRecipeFromGroup(recipeId, grouopId)
            .then(() => {
                res.end(`Recipe ${recipeId} deleted from group ${grouopId}`)
            })
    })

    app.delete('/group/:groupId', (req, res) => {
        const grouopId = req.params.groupId;
        GroupService.remove(grouopId)
            .then(() => res.end(`group ${grouopId} Deleted `))
    })

    // ask to join group
    app.put('/group/join/:groupId', (req, res) => {
        console.log('try to add');

        const ids = req.body;
        GroupService.askJoin(ids)
            .then(result => {
                console.log('successfuly updated pending request')
                GroupService.getById(ids.groupId).then(group => {
                    let sockets = Object.values(io.sockets.connected)
                    let targetSocket = sockets.find(socket => {
                        let socketUserId = socket.userId
                        return String(socketUserId) === String(group.admin._id)
                    })
                    io.to(`${targetSocket.id}`).emit('Join', group);
                })
                return res.json()
            })
    })
    app.put('/group/leave/:groupId', (req, res) => {
        const ids = req.body;
        GroupService.removeUserFromGroup(ids)
            .then(() => {
                console.log('successfuly leaved')
                return res.json()
            })
    })


    // add user to group participants
    app.put('/group/accept/:groupId', (req, res) => {
        const ids = req.body;
        GroupService.addParticipant(ids)
            .then(user => {
                GroupService.getById(ids.groupId).then(group => {
                    let sockets = Object.values(io.sockets.connected)
                    let targetSocket = sockets.find(socket => {
                        let socketUserId = socket.userId
                        return String(socketUserId) === String(ids.userId)
                    })
                    io.to(`${targetSocket.id}`).emit('accepted', group);
                })
                return res.json(user)
            })
    })

    // remove user from pending request
    app.put('/group/decline/:groupId', (req, res) => {
        const ids = req.body;
        GroupService.removePendingUser(ids)
            .then(() => {
                console.log('pending removed');

                return res.json('pending removed')
            })
    })
    app.put('/group/:groupId', (req, res) => {
        const group = req.body;
        GroupService.update(group)
            .then(group => {
                return res.json(group)
            })
    })



}

module.exports = addGroupRoutes