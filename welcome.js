module.exports = client => {
    const channelId = '837970685489709076' // Welcome channel
    const targetChannelId = '845403069709680680' // Role Claim
    
    client.on('guildMemberAdd', member => {
        const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}