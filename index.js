const Discord = require('discord.js')
const client = new Discord.Client()

const command = require('./command')
const config = require('./config.json')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')
const roleClaim = require('./role-claim')
const poll = require('./poll')
const welcome = require('./welcome')
const welcomedb = require('./welcomedb')
const memberCount = require('./member-count')
const sendMessage = require('./send-message')
const mongo = require('./mongo')

client.on('ready', async () => {
    console.log('The client is ready!')

/////// MongoDB Introduction
    await mongo().then(mongoose => {
        try {
            // Try some code here
            console.log('Connection to Mongo!')
        } catch(e) {
            // handle the error here
        } finally {
            // will always run
            mongoose.connection.close()
        }
    })

/////// Per-Server Settings
    welcomedb(client)

/////// &cc or &clearchannel
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

/////// Creating channels
    command(client, ['createtextchannel', 'ctc'], (message) => {
        const channelName = message.content.replace('&createtextchannel ' && '&ctc ', '')

        message.guild.channels.create(channelName, {
            type: 'text'
        }).then((channel) => {
            const categoryId = '833783765699788851'
            channel.setParent(categoryId)
        })
    })

})


require('dotenv').config();
client.login(process.env.BOTTOKEN);