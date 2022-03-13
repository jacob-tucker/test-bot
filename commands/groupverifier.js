const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const execute = async (interaction, options) => {
  let role = interaction.guild.roles.cache.find(role => role === options.getRole('role'));
  if (!role) {
      interaction.reply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
  }

  let creator = options.getString('creator');
  let groupName = options.getString('groupname');
  verifyGroupButton(interaction, creator, groupName, role.id);
}

const verifyGroupButton = (interaction, creator, groupName, roleId) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`verifyGroup-${creator}-${groupName}-${roleId}`)
                .setLabel('Verify')
                .setStyle('SUCCESS')
        );

    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setTitle(`Verify you own a FLOAT from ${groupName}`)
        .addFields(
            { name: 'Created by', value: creator },
        )
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setDescription('Click the `Verify` button below to get the ' + `<@&${roleId}>` + ' role with your EmeraldID.')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    interaction.reply({ embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
    name: 'groupverifier',
    description: 'setup a role verification with emeraldid',
    execute: execute,
}