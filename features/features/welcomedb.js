const { Channel } = require('discord.js')
const mongo = require('@util/mongo')
const welcomeSchema = require('@schemas/welcome-schema')

const command = require('@util/command')

module.exports = client => {

    const cache = {}
    command(client, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermission('ADMININISTRATOR')) {
            channel.send('You do not have permission to run this command.')
            return
        }

        let text = content

        const split = text.split(' ')

        if (split.length < 2) {
            channel.send('Please provide a welcome message')
            return
        }

        split.shift()
        text = split.join(' ')

        cache[guild.id] = [channel.id, text]

        await welcomeSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            channelId: channel.id,
            text,
        }, {
            upsert: true
        })
    })

    const onJoin = async (member) => {
        const { guild } = member
        
        let data = cache[guild.id]

        if (async (!data)) {
            console.log('FETCHING FROM DATABASE')

            const result = await welcomeSchema.findOne({ _id: guild.id })

            cache[guild.id] = data = [result.channelId, result.text]
        }

        const channelId = data[0]
        const text = data[1]

        const channel = guild.channels.cache.get(channelId)
        channel.send(text.replace(/<@>/g, `<@${member.id}>`))
    }

    command(client, 'simjoin', message => {
        onJoin(message.member)
    })

    client.on('guildMemberAdd', member => {
        onJoin(member)
    })
}