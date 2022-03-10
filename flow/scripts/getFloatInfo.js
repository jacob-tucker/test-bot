const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
const { resolveAddressObject } = require('./resolveNames');

const getFloatInfo = async (account, eventId) => {
  /* Convert resolved names to address */
  let resolved = account;
  if (resolved.includes('.') || resolved.slice(0, 2) !== '0x') {
    resolved = await resolveAddressObject(account);
  }
  if (!resolved) {
    return {error: true, message: 'This account is invalid.'};
  }

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(resolved, t.Address),
        fcl.arg(parseInt(eventId), t.UInt64)
      ])
    ]).then(fcl.decode);

    return {
      id: result[0].id,
      owner: account,
      eventId: result[0].eventId, 
      eventImage: result[0].eventImage,
      eventName: result[0].eventName,
      eventHost: result[0].eventHost,
      eventDescription: result[0].eventDescription,
      serial: result[0].serial
    }
  } catch(e) {
    return {error: true, message: 'The account does not own this FLOAT, or the FLOAT ID is invalid.'};
  }
}

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(account: Address, eventId: UInt64): [&FLOAT.NFT] {
  let floatCollection = getAccount(account).getCapability(FLOAT.FLOATCollectionPublicPath)
                        .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                        ?? panic("Could not borrow the Collection from the account.")
  return floatCollection.ownedFLOATsFromEvent(eventId: eventId)
}
`;

module.exports = {
  getFloatInfo
}