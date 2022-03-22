const { checkOwnsFloat } = require('../flow/scripts/checkOwnsFloat.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const execute = async (interaction, options) => {
    const eventId = options[0];
    const roleId = options[1];
    const user = options[2];
    let ownsFloat = await checkOwnsFloat(user, eventId);
    if (ownsFloat === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        interaction.reply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        interaction.reply({ content: "You do not own a FLOAT from this Event.", ephemeral: true });
    }
}


module.exports = {
    name: 'verifyFloat',
    description: 'verifies if a user has a float from a specific event and gives them the role for it',
    execute: execute,
}