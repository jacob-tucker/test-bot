const { MessageEmbed } = require('discord.js');
const { checkEmeraldIDFromAccount } = require('../flow/scripts/checkEmeraldID');
const { resolveAddressObject } = require('../flow/scripts/resolveNames');

const execute = async (interaction, options) => {
    await interaction.deferReply();
    const obj = await resolveAddressObject(options.getString('account'));
    if (!obj.address) {
        await interaction.deleteReply();
        await interaction.followUp({ ephemeral: true, content: 'This is not a valid user account.' })
        return;
    }
    const emeraldID = await checkEmeraldIDFromAccount(obj.address);
    sendNames(interaction, obj.address, obj.resolvedNames.find, obj.resolvedNames.fn, emeraldID)
}

const sendNames = async (interaction, address, find, fn, emeraldID) => {
    let roleMap;
    if (emeraldID) {
        roleMap = interaction.guild.members.cache.get(emeraldID).roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(", ");
    }
    console.log(roleMap)
    const embed = new MessageEmbed()
        .setColor('#5bc595')
        .addFields(
            { name: 'Address', value: address || "N/A", inline: true },
            { name: '.find', value: find || "N/A", inline: true },
            { name: '.fn', value: fn || "N/A", inline: true },
            { name: 'EmeraldID', value: (emeraldID ? '✅' : "N/A"), inline: true },
            { name: 'Roles', value: roleMap || "N/A", inline: true }
        )
        .setAuthor('Emerald City', 'https://i.imgur.com/YbmTuuW.png', 'https://discord.gg/emeraldcity')
        .setThumbnail('https://i.imgur.com/UgE8FJl.png');

    await interaction.editReply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
    name: 'resolve',
    description: 'resolve a .find or .fn name',
    execute,
}