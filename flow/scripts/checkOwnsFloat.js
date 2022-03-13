const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkOwnsFloat = async (account, eventId) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(parseInt(eventId), t.UInt64)
      ])
    ]).then(fcl.decode);
    return result;
  } catch(e) {
    console.log(e)
    return {error: true, message: 'You do not own this FLOAT.'};
  }
}

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(account: Address, eventId: UInt64): Bool {
  let floatCollection = getAccount(account).getCapability(FLOAT.FLOATCollectionPublicPath)
                        .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                        ?? panic("Could not borrow the Collection from the account.")
  let ids = floatCollection.ownedIdsFromEvent(eventId: eventId)
  return ids.length > 0
}
`;

module.exports = {
  checkOwnsFloat
}