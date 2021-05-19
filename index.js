const Discord = require('discord.js')
const client = new Discord.Client()

const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', () => {
    console.log('The client is ready!')

/////// &ping
    command(client, 'ping', (message) => {
        message.channel.send('Pong!')
    })

/////// &servers
    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

/////// &cc or &clearchannel
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

/////// &status
    command(client, 'status', message => {
        const content = message.content.replace('&status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })

/////// Auto add/update first message with reactions
    firstMessage(client, '844557319085228043', 'hello world, How are you?', ['🔥', '💣'])
    
/////// Sending Private Messages by command
    privateMessage(client, 'ping', 'Pong!')

/////// Sending Private Messages automaticly to a user
    // client.users.fetch('0123456789').then((user) => {
    //    user.send('Hello World!')
    // })

})


require('dotenv').config();
client.login(process.env.BOTTOKEN);