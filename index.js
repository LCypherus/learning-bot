const Discord = require('discord.js')
const client = new Discord.Client()
const command = require('./command.js')

client.on('ready', () => {
    console.log('The client is ready!')

    command(client, 'ping', (message) => {
        message.channel.send('Pong!')
    })
})

require('dotenv').config();
client.login(process.env.BOTTOKEN);