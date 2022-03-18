const { checkOwnsCustom } = require('../flow/scripts/checkOwnsCustom.js');

const execute = async (interaction, options) => {
    const customName = options[0];
    const roleId = options[1];
    const user = '0xda09c74f322859e2';
    const ownsCustom = await checkOwnsCustom(customName, user);
    if (ownsCustom === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        interaction.reply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        interaction.reply({ content: `You do not meet the requirements for ${customName}.`, ephemeral: true });
    }
}


module.exports = {
    name: 'verifyCustom',
    description: 'verifies if a user has a custom entity that is pre-defined in ./flow/holdings/holdings.js',
    execute: execute,
}