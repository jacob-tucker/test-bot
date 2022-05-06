const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkEmeraldID = async (discordID) => {
  try {
    const accountResponse = await fcl.send([
      fcl.script(scriptCode1),
      fcl.args([
        fcl.arg(discordID, t.String)
      ])
    ]).then(fcl.decode);
  
    return accountResponse;
  } catch(e) {
    return null;
  }
}

const checkEmeraldIDFromAccount = async (account) => {
  try {
    const discordID = await fcl.send([
      fcl.script(scriptCode3),
      fcl.args([
        fcl.arg(account, t.Address)
      ])
    ]).then(fcl.decode);
  
    return discordID;
  } catch(e) {
    return null;
  }
}

const checkEmeraldIDBatch = async (discordIDs) => {
  try {
    const accounts = await fcl.send([
      fcl.script(scriptCode2),
      fcl.args([
        fcl.arg(discordIDs, t.Array(t.String))
      ])
    ]).then(fcl.decode);
  
    return accounts;
  } catch(e) {
    return null;
  }
}

const scriptCode1 = `
import EmeraldIdentity from 0xEmeraldIdentity

pub fun main(discordID: String): Address? {
  return EmeraldIdentity.getAccountFromDiscord(discordID: discordID)
}
`;

const scriptCode3 = `
import EmeraldIdentity from 0xEmeraldIdentity

pub fun main(account: Address): String? {
  return EmeraldIdentity.getDiscordFromAccount(account: account)
}
`;

const scriptCode2 = `
import EmeraldIdentity from 0xEmeraldIdentity

pub fun main(discordIDs: [String]): {String: Address?} {
  let answer: {String: Address?} = {}
  for discordID in discordIDs {
    answer[discordID] = EmeraldIdentity.getAccountFromDiscord(discordID: discordID)
  }
  return answer
}
`;

module.exports = {
  checkEmeraldID,
  checkEmeraldIDBatch,
  checkEmeraldIDFromAccount
}