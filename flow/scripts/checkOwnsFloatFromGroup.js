const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const checkOwnsFloatFromGroup = async (creator, groupName, user) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(creator, t.Address),
        fcl.arg(groupName, t.String),
        fcl.arg(user, t.Address),
      ])
    ]).then(fcl.decode);
    return result;
  } catch(e) {
    return {error: true, message: 'You do not own this FLOAT.'};
  }
}

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(host: Address, groupName: String, user: Address): Bool {
  let eventsCollection = getAccount(host).getCapability(FLOAT.FLOATEventsPublicPath)
                        .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
                        ?? panic("Could not borrow the FLOATEventsPublic from the host.")
  let group = eventsCollection.getGroup(groupName: groupName) ?? panic("This group does not exist.")
  let eventsInGroup = group.getEvents()

  let floatsCollection = getAccount(user).getCapability(FLOAT.FLOATCollectionPublicPath)
                        .borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>()
                        ?? panic("Could not borrow the CollectionPublic from the user.")
  
  for eventId in eventsInGroup {
    if floatsCollection.ownedIdsFromEvent(eventId: eventId).length > 0 {
      return true
    }
  } 

  return false
}
`;

module.exports = {
  checkOwnsFloatFromGroup
}