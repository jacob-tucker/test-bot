const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
const { toAddress } = require('./resolveNames');

const getFloatInfo = async (account, floatId) => {
  /* Convert resolved names to address */
  let resolved = account;
  if (resolved.includes('.') || resolved.slice(0, 2) !== '0x') {
    resolved = await toAddress(account);
  }
  if (!resolved) {
    return {error: true, message: 'This account is invalid.'};
  }

  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(resolved, t.Address),
        fcl.arg(parseInt(floatId), t.UInt64)
      ])
    ]).then(fcl.decode);

    return {
      id: result.id,
      owner: account,
      eventId: result.eventId, 
      eventImage: result.eventImage,
      eventName: result.eventName,
      eventHost: result.eventHost,
      eventDescription: result.eventDescription,
      serial: result.serial
    }
  } catch(e) {
    return {error: true, message: 'The account does not own this FLOAT, or the FLOAT ID is invalid.'};
  }
}

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(account: Address, id: UInt64): &FLOAT.NFT {
  let floatCollection = getAccount(account).getCapability(FLOAT.FLOATCollectionPublicPath)
                        .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                        ?? panic("Could not borrow the Collection from the account.")
  return floatCollection.borrowFLOAT(id: id)!
}
`;

module.exports = {
  getFloatInfo
}