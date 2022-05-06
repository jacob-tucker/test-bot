const { getFloatInfo } = require('../flow/scripts/getFloatInfo.js');

const execute = async (interaction, options) => {
    await interaction.deferReply();
    let float = await getFloatInfo(options.getString('account'), options.getNumber('floatid'));
    if (float.error) {
        await interaction.deleteReply();
        await interaction.followUp({ ephemeral: true, content: float.message }).catch(e => console.log(e));
        return;
    }
    postFloat(interaction, float);
}

const postFloat = async (interaction, float) => {
    const embed = {
        color: '#5bc595',
        title: float.eventName,
        url: `https://floats.city/${float.owner}/float/${float.id}`,
        author: {
            name: 'FLOAT',
            url: 'https://floats.city/',
            iconURL: 'https://i.imgur.com/qOC18pn.png'
        },
        description: `${float.eventDescription}`,
        thumbnail: {
            url: `https://ipfs.infura.io/ipfs/${float.eventImage}`,
        },
        fields: [
            {
                name: "Owned by",
                value: float.owner,
                inline: true
            },
            {
                name: 'Id',
                value: String(float.id),
                inline: true
            },
            {
                name: 'Serial #',
                value: String(float.serial),
                inline: true
            }
        ],
    };

    await interaction.editReply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
    name: 'float',
    description: 'display information about a float',
    execute,
}