module.exports = {
    commands: ['deletechannel', 'delchannel'],
    maxArgs: 0,
    permissions: 'ADMINISTRATOR',
    permissionError: 'You must be an admin to use this command.',
    callback: (message => {
        message.channel.delete()
    })
}