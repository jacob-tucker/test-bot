const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const execute = (interaction) => {
    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setDescription('Click the link below to setup your EmeraldID.')
        .setTimestamp()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL('https://id.ecdao.org' + '/create')
                .setLabel('Create your own EmeraldID')
                .setStyle('LINK')
        );

    interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
}

module.exports = {
    name: 'initializeEmeraldID',
    description: 'send the user to a link to initialize their emerald id',
    execute: execute,
}