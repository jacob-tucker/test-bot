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
    return result || {error: true, message: 'You do not own any FLOATs from this Group.'};
  } catch(e) {
    return {error: true, message: 'You do not own any FLOATs from this Group.'};
  }
}

const checkOwnsAllFloatsFromGroup = async (creator, groupName, user) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode2),
      fcl.args([
        fcl.arg(creator, t.Address),
        fcl.arg(groupName, t.String),
        fcl.arg(user, t.Address),
      ])
    ]).then(fcl.decode);
    return result || {error: true, message: 'You do not own all the FLOATs from this Group.'};
  } catch(e) {
    return {error: true, message: 'You do not own all the FLOATs from this Group.'};
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

const scriptCode2 = `
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
    if floatsCollection.ownedIdsFromEvent(eventId: eventId).length == 0 {
      return false
    }
  } 

  return true
}
`;

module.exports = {
  checkOwnsFloatFromGroup,
  checkOwnsAllFloatsFromGroup
}