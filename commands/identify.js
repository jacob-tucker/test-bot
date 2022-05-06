const { MessageEmbed } = require('discord.js');
const { checkEmeraldID } = require('../flow/scripts/checkEmeraldID');
const { resolveAddressObject } = require('../flow/scripts/resolveNames');

const execute = async (interaction, options) => {
    await interaction.deferReply();
    let discordUser = options.getUser('user');
    let discordId = discordUser.id;
    let emeraldID = await checkEmeraldID(discordId);
    if (!emeraldID) {
        await interaction.deleteReply();
        await interaction.followUp({ ephemeral: true, content: 'This user does not have an EmeraldID.' })
        return;
    }
    const obj = await resolveAddressObject(emeraldID);
    sendIdentification(interaction, obj.address, obj.resolvedNames.find, obj.resolvedNames.fn)
}

const sendIdentification = async (interaction, address, find, fn) => {
    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .addFields(
            { name: 'Address', value: address || "N/A", inline: true },
            { name: '.find', value: find || "N/A", inline: true },
            { name: '.fn', value: fn || "N/A", inline: true },
            { name: 'EmeraldID', value: "✅", inline: true }
        )
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    await interaction.editReply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
    name: 'identify',
    description: 'identify an on-chain user',
    execute,
}