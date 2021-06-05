const Discord = require('discord.js')
const mongo = require('@util/mongo')
const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
    commands: ['punishmentlogs', 'punishlogs', 'pl'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<Target user's @>",
    permission: "ADMINISTRATORS",
    callback: async (message, arguments) => {
        const target = message.mentions.users.first()
        if (!target) {
            message.reply('Please specify someone to load punishments for.')
            return
        }

        const { guild } = message
        const { id } = target

        const results = await punishmentLogSchema.find({
            guildId: guild.id,
            userId: id
        })

        let reply = 'Previous punishments:\n\n'

        for (const result of results) {
            reply += `${result.command} was ran at ${new Date(result.createdAt).toLocaleDateString()}\n`
        }

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription(reply)
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

            message.reply(exampleEmbed);
    }
}