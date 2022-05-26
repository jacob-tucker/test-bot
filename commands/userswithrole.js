const { MessageAttachment, Permissions } = require('discord.js');
const { checkEmeraldIDBatch } = require('../flow/scripts/checkEmeraldID');

const execute = async (interaction, options) => {
  if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
    await interaction.deferReply({ ephemeral: true });
    const role = options.getRole('role');
    if (!role) {
      await interaction.editReply({ ephemeral: true, content: 'This role does not exist.' }).catch(e => console.log(e));
      return;
    }
    sendInfo(interaction, role);
  }
}

const sendInfo = async (interaction, role) => {
  await interaction.guild.members.fetch();

  // Maps discordID => discord username
  const usersWithRole = {};
  role.members.forEach(member => {
    usersWithRole[member.user.id] = member.user.tag;
  })

  // Maps discord username => emeraldID
  let fields = {};
  // A list of discordIDs
  const userIDs = Object.keys(usersWithRole);
  // Maps discordID => emeraldID
  const answer = await checkEmeraldIDBatch(userIDs);
  for (let i = 0; i < userIDs.length; i++) {
    let emeraldID = answer[userIDs[i]];
    let userTag = usersWithRole[userIDs[i]];
    fields[userTag] = emeraldID || 'N/A';
  }
  const csv = csvmaker(fields);

  const userList = new MessageAttachment(Buffer.from(csv), 'users.csv');
  await interaction.editReply({ content: `Users with the <@&${role.id}> role:`, files: [userList] });
}

const csvmaker = function (data) {

  // Empty array for storing the values
  csvRows = [];

  // Headers is basically a keys of an
  // object which is id, name, and
  // profession
  const headers = Object.keys(data);

  // As for making csv format, headers
  // must be separated by comma and
  // pushing it into array
  csvRows.push(headers.join(','));

  // Pushing Object values into array
  // with comma separation
  const values = Object.values(data).join(',');
  csvRows.push(values)

  // Returning the array joining with new line
  return csvRows.join('\n')
}

module.exports = {
  name: 'userswithrole',
  description: 'get discord name and address of someone in a role',
  execute
}