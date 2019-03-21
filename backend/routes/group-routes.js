const GroupService = require('../services/group-service')


function addGroupRoutes(app) {

    app.get('/group/:filterBy?', (req, res) => {
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
                console.log('group retrieved is', group)
                res.json(group)
            })
    })

    app.post('/group', (req, res) => {
        let group = req.body
        GroupService.add(group)
            .then(updatedGroup => {
                console.log('group added and is', res.json(updatedGroup))
                res.json(updatedGroup)
            })
    })

    app.delete('/group/:groupId', (req, res) => {
        const grouopId = req.params.groupId;
        GroupService.remove(grouopId)
            .then(() => res.end(`group ${grouopId} Deleted `))
    })

    app.put('/group/:groupId', (req, res) => {
        const group = req.body;
        console.log('request group to update', group)
        GroupService.update(group)
            .then(group => {
                console.log('successfuly updated group')
                return res.json(group)
            })
    })

}

module.exports = addGroupRoutes