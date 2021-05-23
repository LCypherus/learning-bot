const config = require('./config.json')

module.exports = (client) => {
    const { prefix } = config
    
    const channelIds = [
        // '846111639631167558', // Testing
    ]

    const addReactions = message => {
        message.react('👍')

        setTimeout (() => {
            message.react('👎')
        }, 750)
    }

    client.on('message', async (message) => {
        if (channelIds.includes(message.channel.id)) {
            addReactions(message)
        } else if (message.content.toLowerCase() === `${prefix}poll`) {
            await message.delete() // Handy to delete commands! Like for ticket system

            const fetched = await message.channel.messages.fetch({ limit: 1 })
            if (fetched && fetched.first()) {
                addReactions(fetched.first())
            }
        }
    })

}