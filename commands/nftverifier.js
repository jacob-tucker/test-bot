const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');

const execute = async (interaction, options) => {
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const role = interaction.guild.roles.cache.find(role => role === options.getRole('role'));
        if (!role) {
            interaction.reply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
            return;
        }

        const contractName = options.getString('contractname');
        const contractAddress = options.getString('contractaddress');
        const publicPath = options.getString('publicpath');
        verifyNFTButton(interaction, contractName, contractAddress, publicPath, role.id);
    }
}

const verifyNFTButton = (interaction, contractName, contractAddress, publicPath, roleId) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`verifyNFT-${contractName}-${contractAddress}-${publicPath}-${roleId}`)
                .setLabel('Verify')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setURL('https://id.ecdao.org' + '/reset')
                .setLabel('Reset')
                .setStyle('LINK')
        );

    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .setTitle(`Verify you own a ${contractName} NFT`)
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setDescription('Click the `Verify` button below to get the ' + `<@&${roleId}>` + ' role with your EmeraldID.')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    interaction.reply({ embeds: [embed], components: [row] }).catch(e => console.log(e));
}

module.exports = {
    name: 'nftverifier',
    description: 'setup a role verification with emeraldid for an arbitrary nft',
    execute: execute,
}