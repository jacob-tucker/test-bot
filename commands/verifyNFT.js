const { checkOwnsNFT } = require('../flow/scripts/checkOwnsNFT.js');

const execute = async (interaction, options) => {
    const contractName = options[0];
    const contractAddress = options[1];
    const publicPath = options[2];
    const roleId = options[3];
    const user = options[4];
    const ownsNFT = await checkOwnsNFT(contractName, contractAddress, publicPath, user);
    if (ownsNFT === true) {
        interaction.member.roles.add(roleId).catch((e) => console.log(e));
        await interaction.editReply({ content: "You have been given the " + `<@&${roleId}>` + " role.", ephemeral: true });
    } else {
        await interaction.editReply({ content: `You do not own a NFT from ${contractName}.`, ephemeral: true });
    }
}


module.exports = {
    name: 'verifyNFT',
    description: 'verifies if a user has a nft from a certain contract',
    execute,
}