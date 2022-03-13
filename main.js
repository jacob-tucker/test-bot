require('dotenv').config();
const { Client, Intents, Collection, Constants } = require('discord.js');

const fs = require('fs');
const fcl = require("@onflow/fcl");

const express = require('express');
const float = require('./commands/float');

const app = express();

fcl.config()
  .put('accessNode.api', 'https://testnet.onflow.org')
  .put('0xFLOAT', '0x0afe396ebc8eee65')
  .put('0xFIND', '0xa16ab1d0abde3625')
  .put('0xFN', '0xb05b2abb42335e88')
  .put('0xNFT', '0x631e88ae7f1d7c20')

const port = process.env.PORT || 5000;

const prefix = '!';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Gets all of our commands from our commands folder
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // command.name is the name of the file,
  // and command has a list of all the module exports
  // in that file.
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Emerald bot is online!');

  const guildId = '927688041919807558'; // Use your guild ID instead
  const guild = client.guilds.cache.get(guildId);
  let commands;
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application?.commands;
  }

  commands?.create({
    name: 'float',
    description: 'View a FLOAT from someones collection',
    options: [
      {
        name: 'address',
        description: 'The users address',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'floatid',
        description: 'The ID of the FLOAT',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER
      }
    ]
  });

  commands?.create({
    name: 'floatverifier',
    description: 'Setup a button to verify a user owns a FLOAT from a specified Event and give them a role for it.',
    options: [
      {
        name: 'eventid',
        description: 'The id of the event',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.NUMBER
      },
      {
        name: 'role',
        description: 'The role you wish to give',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.ROLE
      }
    ]
  });

  commands?.create({
    name: 'groupverifier',
    description: 'Setup a button to verify a user owns a FLOAT from a certain group of FLOAT Events.',
    options: [
      {
        name: 'creator',
        description: 'The Group creators address',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'groupname',
        description: 'The name of the Group',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'role',
        description: 'The role you wish to give',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.ROLE
      }
    ]
  });

  commands?.create({
    name: 'resolve',
    description: 'Resolve a .find or .fn name.',
    options: [
      {
        name: 'account',
        description: 'An address, .find, or .fn name.',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      }
    ]
  });

  commands?.create({
    name: 'nftverifier',
    description: 'Setup a button to verify a user owns a NFT from a certain collection.',
    options: [
      {
        name: 'contractname',
        description: 'The name of the contract',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'contractaddress',
        description: 'The address of the contract',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'publicpath',
        description: 'The public path to the collection',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'role',
        description: 'The role you wish to give',
        required: true,
        type: Constants.ApplicationCommandOptionTypes.ROLE
      }
    ]
  });

  commands?.create({
    name: 'god',
    description: 'Take a look at God.'
  });
})

// When a user types a message
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // Executes the youtube.js file
  if (command === 'test') {
    console.log("wtf")
    message.channel.send('Testing!');
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    let customIdArray = interaction.customId.split('-');
    let commandName = customIdArray.shift();
    client.commands.get(commandName).execute(interaction, customIdArray);
  } 
  else if (interaction.isCommand()) {
    const {commandName, options} = interaction;
    console.log(options)
    client.commands.get(commandName).execute(interaction, options);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// This is the bot's token
// Must be at the bottom of the file
client.login(process.env.TOKEN);