const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const CryptoJS = require('crypto-js');

const execute = (interaction) => {
    console.log(interaction.member.id)
    const ciphertext = CryptoJS.AES.encrypt(interaction.member.id, process.env.CRYPTO_KEY).toString();
    console.log(ciphertext)
    var bytes  = CryptoJS.AES.decrypt(ciphertext, process.env.CRYPTO_KEY);
    console.log({bytes})
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log({originalText})

    const embed = new MessageEmbed()
      .setColor('#5bc595')
      .setDescription('Click the link below to setup your EmeraldID.')
      .setTimestamp()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL('https://id.ecdao.org' + '/create/' + encodeURIComponent(ciphertext))
                .setLabel('Create your own EmeraldID')
                .setStyle('LINK')
        );

    interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
}

module.exports = {
    name: 'initializeEmeraldID',
    description: 'send the user to a link to initialize their emerald id',
    execute: execute,
}