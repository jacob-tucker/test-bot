const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkEmeraldID = async (discordID) => {
  const accountResponse = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
          fcl.arg(discordID, t.String)
      ])
  ]).then(fcl.decode);

  return accountResponse;
}

const scriptCode = `
import EmeraldIdentity from 0xEmeraldID

pub fun main(discordID: String): Address? {
  return EmeraldIdentity.getAccountFromDiscord(discordID: discordID)
}
`;

module.exports = {
  checkEmeraldID
}