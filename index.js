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

/////// Creating channels
    command(client, 'createtextchannel', (message) => {
        const channelName = message.content.replace('&createtextchannel ', '')

        message.guild.channels.create(channelName, {
            type: 'text'
        }).then((channel) => {
            const categoryId = '833783765699788851'
            channel.setParent(categoryId)
        })
    })

    command(client, 'createvoicechannel', (message) => {
        const channelName = message.content.replace('&createvoicechannel ', '')

        message.guild.channels.create(channelName, {
            type: 'voice'
        }).then((channel) => {
            const categoryId = '833783765699788851'
            channel.setParent(categoryId)
            channel.setUserLimit(10)
        })
    })

/////// Embed messages
    command(client, 'embed', (message) => {
        const logo = 'https://yt3.ggpht.com/a-/AOh14GgD43Ka7oxkCrxPAXiIuY8-rG3Kb4h9dQuhulOH=s100-c-k-c0xffffffff-no-rj-mo'
    
        const embed = new Discord.MessageEmbed()
            .setTitle('Example text embed')
            .setURL('https://www.youtube.com/channel/UChPrh75CmPP9Ig6jISPnfNA')
            .setAuthor(message.author.username)
            .setImage(logo)
            .setThumbnail(logo)
            .setFooter('This is a footer')
            .setColor('#00AAFF')
            .addFields(
                {
                    name: 'Field 1',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 2',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 3',
                    value: 'Hello world',
                    inline: true,
                },
                {
                    name: 'Field 4',
                    value: 'Hello world',
                }
            )
    
        message.channel.send(embed)
    })

/////// Server info command
    command(client, 'serverinfo', (message) => {
        const { guild } = message
        // console.log(guild)

        const { name, region, memberCount, owner} = guild
        // All possible properties can be found here: https://discord.js.org/#/docs/main/stable/class/Guild
        const icon = guild.iconURL()

        // console.log(name, region, memberCount, icon)
        // console.log(owner.user.tag)

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                },
                {
                    name: 'Members',
                    value: memberCount,
                },
                {
                    name: 'Owner',
                    value: owner.user.tag,
                },
            )

            message.channel.send(embed)
    })

})


require('dotenv').config();
client.login(process.env.BOTTOKEN);