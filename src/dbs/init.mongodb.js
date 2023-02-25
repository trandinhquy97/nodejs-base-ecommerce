'use strict'

const { default: mongoose } = require("mongoose")
const { countConnect } = require("../helpers/check.connect")

const connectionString = 'mongodb://127.0.0.1:27017/shopDev'

class Database {

    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) { // Fake if using Dev env
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectionString).then(_ => {
            console.log(`Connected mongodb success`)
            countConnect()
        })
            .catch(err => console.log(err))
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb