require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

const command = require('@util/command')
const config = require('@root/config.json')
const mongo = require('@util/mongo')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')

client.on('ready', async () => {
    console.log('The client is ready!')

    commandBase.loadPrefixes(client)
    loadCommands(client)
    loadFeatures(client)

/////// MongoDB Introduction
    await mongo().then(async (mongoose) => {
        console.log('Connection to Mongo!')
    })

/////// User Mute Command


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