const { getFloatInfo } = require('../flow/scripts/getFloatInfo.js');

const execute = async (interaction, options) => {
    let float = await getFloatInfo(options.getString('address'), options.getNumber('eventid'));
    if (float.error) {
        interaction.reply({ ephemeral: true, content: float.message }).catch(e => console.log(e));
        return;
    }
    postFloat(interaction, float);
}

const postFloat = (interaction, float) => {
    const embed = {
        color: '#5bc595',
        title: float.eventName,
        url: `https://mainnet.floats.city/${float.eventHost}/${float.eventId}`,
        author: {
            name: 'FLOAT',
            url: 'https://mainnet.floats.city/',
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

    interaction.reply({ embeds: [embed] }).catch(e => console.log(e));
}

module.exports = {
    name: 'float',
    description: 'display information about a float',
    execute: execute,
}