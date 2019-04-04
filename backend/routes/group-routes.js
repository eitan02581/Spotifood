const GroupService = require('../services/group-service')
const UserService = require('../services/user-service')
const ObjectId = require('mongodb').ObjectId;

function addGroupRoutes(app, io) {
    app.get('/group', (req, res) => {
        const filterBy = req.query
        GroupService.query(filterBy)
            .then(groups => {
                // console.log('answer from query', groups)
                return res.json(groups)
            })
    })

    app.get('/group/:groupId', (req, res) => {
        let groupId = req.params.groupId
        console.log('group id to get is', groupId)
        GroupService.getById(groupId)
            .then(group => {
                // console.log('group retrieved is', group.admin)
                res.json(group)
            })
    })

    app.post('/group', (req, res) => {
        let group = req.body
        console.log('group to add in route is', group)
        GroupService.add(group)
            .then(updatedGroup => {
                // console.log('group added and is', updatedGroup)
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
        const ids = req.body;
        GroupService.askJoin(ids)
            .then(result => {
                console.log('successfuly updated pending request')
                GroupService.getById(ids.groupId).then(group => {
                    console.log('group admin is', group.admin)
                    console.log('these are sockets:',Object.values(io.sockets.connected))
                    let sockets = Object.values(io.sockets.connected)
                    let targetSocket = sockets.find(socket => { 
                        let groupAdminId = ObjectId(group.admin).toString()
                        return socket.userId === groupAdminId
                    })
                    console.log('target socket id:', targetSocket.id)
                    io.to(`${targetSocket.id}`).emit('hey', 'I just met you');

                })
                return res.json()
            })
    })
    app.put('/group/leave/:groupId', (req, res) => {
        const ids = req.body;
        UserService.removeGroupFromUser(ids)
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
            .then(() => {
                console.log('successfuly added participant')
                return res.json('added!!')
            })
    })

    // remove user from pending request
    app.put('/group/decline/:groupId', (req, res) => {
        const ids = req.body;
        console.log('requesשדגate', ids)
        GroupService.removePendingUser(ids)
            .then(() => {
                console.log('successfuly added participant')
                return res.json('added!!')
            })
    })
    app.put('/group/:groupId', (req, res) => {
        const group = req.body;
        // console.log('request group to update', group)
        GroupService.update(group)
            .then(group => {
                console.log('successfuly updated group')
                return res.json(group)
            })
    })



}

module.exports = addGroupRoutes