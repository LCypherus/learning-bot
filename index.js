const Discord = require('discord.js')
const client = new Discord.Client()
const command = require('./command.js')

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, 'ping', (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message => {
        const content = message.content.replace('&status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

require('dotenv').config();
client.login(process.env.BOTTOKEN);