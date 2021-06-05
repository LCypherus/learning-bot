const mongoose = require('mongoose')
// const { mongoPath } = require('./config.json')

require('dotenv').config();
const mongoPath = process.env.MONGODB

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose
}