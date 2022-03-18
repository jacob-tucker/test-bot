const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const execute = async (interaction, options) => {
  const role = interaction.guild.roles.cache.find(role => role === options.getRole('role'));
  if (!role) {
      interaction.reply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
  }

  const customName  = options.getString('customname');
  verifyCustomButton(interaction, customName, role.id);
}

const verifyCustomButton = (interaction, customName, roleId) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`verifyCustom-${customName}-${roleId}`)
                .setLabel('Verify')
                .setStyle('SUCCESS')
        );

    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setTitle(`Verify you own a ${customName}`)
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setDescription('Click the `Verify` button below to get the ' + `<@&${roleId}>` + ' role with your EmeraldID.')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    interaction.reply({ embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
    name: 'customverifier',
    description: 'setup a role verification with emeraldid for a custom entity (must be added to ./flow/holdings/holdings.js through a PR)',
    execute: execute,
}