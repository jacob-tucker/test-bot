const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const execute = (message, args) => {
    let role = message.guild.roles.cache.find(role => role.name === args[0]);
    if (!role) {
        return;
    }
    getRole(message, role.id);
}

const getRole = (message, roleID) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`role-join-${roleID}`)
                .setLabel('Join')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId(`role-remove-${roleID}`)
                .setLabel('Remove')
                .setStyle('SECONDARY'),
        );

    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setTitle('Receive Emerald Academy Pings')
        .setThumbnail('https://i.imgur.com/27H7J1a.png');

    message.channel.send({ ephemeral: true, embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
    name: 'role',
    description: 'get a specific role',
    execute: execute,
}

