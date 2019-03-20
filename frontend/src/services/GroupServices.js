import axios from 'axios'

const Group_ROUTE = (process.env.NODE_ENV !== 'development') ? '/group' : 'http://localhost:3003/toy'

function query(filterBy) {
}

function add(toy) {
}

function update(toy) {
}

function remove(toyId) {
}

function getById(toyId) {
}

export default {
    query,
    getById,
    add,
    remove,
    update
}