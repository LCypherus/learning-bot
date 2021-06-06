const roles = ['Moderator']

module.exports = (client) => {
    return

    const channelId = '850463011318661150'
    
    client.on('message', message => {
        const { guild, content, member } = message 

        if (member.user.bot) {
             console.log('Ignoring bot')
             return
         }

        const hasRole = member.roles.cache.find((role) => {
            return roles.includes(role.name)
        })

        if (hasRole) {
            const channel = guild.channels.cache.get(channelId)
            channel.send(`<@${member.id}> said this: 
            
"${content}"`)
        }
    })
}