'use strict'

const { default: mongoose } = require('mongoose')
const os = require('os')
const process = require('process')
const _SECOND = 5000

// Count connections
const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number of connections: ${numConnection}`);
}

// Check overloaded
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss

        // Ex each core can handle 5 connections, this is a custom limitation for us.
        const maxConnections = numCores * 5 

        console.log(`Active connection: ${numConnection}`);
        console.log(`Memory used:: ${memoryUsage / 1024 / 1024}`);

        if(numConnection > maxConnections) {
            console.log(`Connection overload detected`);
            // notify.send(...)
        }
    }, _SECOND)
}

module.exports = { 
    countConnect,
    checkOverload
}