const { checkOwnsFloatFromGroup } = require('../flow/scripts/checkOwnsFloatFromGroup.js');

const execute = async (interaction, options) => {
    const creator = options[0];
    const groupName = options[1];
    const roleId = options[2];
    const user = '0xda09c74f322859e2';
    const ownsFloatInGroup = await checkOwnsFloatFromGroup(creator, groupName, user);
    if (ownsFloatInGroup === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        interaction.reply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        interaction.reply({ content: "You do not own a FLOAT in this Group.", ephemeral: true });
    }
}


module.exports = {
    name: 'verifyGroup',
    description: 'verifies if a user has a float inside of a group of events',
    execute: execute,
}