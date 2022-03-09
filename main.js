require('dotenv').config();
const { Client, Intents, Collection, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const fs = require('fs');
const fcl = require("@onflow/fcl");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
var corsOptions = {
  origin: ['https://pedantic-darwin-e512ad.netlify.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST']
};
app.use(cors(corsOptions));

fcl.config()
  .put('accessNode.api', 'https://mainnet.onflow.org');

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
  } else if (command === 'youtube') {
    client.commands.get('youtube').execute(message, args);
  } else if (command === 'role') {
    client.commands.get('role').execute(message, args);
  } else if (command === 'setup') {
    client.commands.get('setup').execute(message, args);
  } else if (command === 'emeraldidrole') {
    client.commands.get('getEmeraldIDRole').execute(message, args);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  interaction.reply({ content: "Hey there!.", ephemeral: true });
});

/* SERVER */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

// This is the bot's token
// Must be at the bottom of the file
client.login(process.env.TOKEN);