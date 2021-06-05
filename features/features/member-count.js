module.exports = client => {
    const channelId = '846344500406386690'

    const updateMembers = guild => {
        const channel = guild.channels.cache.get(channelId)
        if (channel) {
            channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
        }
    }

    client.on('guildMemberAdd', member => updateMembers(member.guild))
    client.on('guildMemberRemove', member => updateMembers(member.guild))

    const guild = client.guilds.cache.get('833783765699788850')
    updateMembers(guild)
}