const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const getGroupInfo = async (account, groupName) => {

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(groupName, t.String)
      ])
    ]).then(fcl.decode);

    return result;
  } catch(e) {
    return {error: true, message: 'The account does not own this Group, or the Group name is invalid.'};
  }
}

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(account: Address, groupName: String): &FLOAT.Group {
  let floatEventCollection = getAccount(account).getCapability(FLOAT.FLOATEventsPublicPath)
                              .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
                              ?? panic("Could not borrow the FLOAT Events Collection from the account.")
  return floatEventCollection.getGroup(groupName: groupName)!
}
`;

module.exports = {
  getGroupInfo
}