const { MessageEmbed } = require('discord.js');

const execute = async (interaction, options) => {
    const embed = new MessageEmbed()
      .setColor('#5bc595')
      .setTitle("Jacob's YouTube Channel")
      .setDescription('Ever wonder what a Flow God looks like? Click the link above.')
      .setURL('https://www.youtube.com/channel/UCf6DzMRwj7SJ3nPrZqd5hHw')
      .setThumbnail('https://i.imgur.com/zpaLqTk.png')

    interaction.reply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
    name: 'god',
    description: 'take a look at god',
    execute: execute,
}