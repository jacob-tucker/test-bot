const fcl = require('@onflow/fcl');

// Sends in an address, .find. or .fn and returns an address.
const resolveAddressObject = async (lookup) => {
  let answer = lookup;
  let rootLookup = lookup.split('.')[0];
  let type = lookup.split('.')[1];

  try {
    if (!type) {
      answer = lookup;
    } else if (type === 'find') {
      answer = await fcl.query({
        cadence: findToAddress,
        args: (arg, t) => [
          arg(rootLookup, t.String)
        ]
      })
    } else if (type === 'fn') {
      answer = await fcl.query({
        cadence: fnToAddress,
        args: (arg, t) => [
          arg(rootLookup, t.String)
        ]
      })
    } else {
      return null;
    }
    return answer;
  } catch (e) {
    console.log('Error: ' + e);
    return null;
  }
}

const addressToFN = `
import Domains from 0xFN
    
pub fun main(address: Address): String? {

  let account = getAccount(address)
  let collectionCap = account.getCapability<&{Domains.CollectionPublic}>(Domains.CollectionPublicPath) 

  if collectionCap.check() != true {
    return nil
  }

  var flownsName = ""
  let collection = collectionCap.borrow()!
  let ids = collection.getIDs()
  
  for id in ids {
    let domain = collection.borrowDomain(id: id)!
    let isDefault = domain.getText(key: "isDefault")
    flownsName = domain.getDomainName()
    if isDefault == "true" {
      break
    }
  }

  return flownsName
}
`;

const addressToFind = `
import FIND from 0xFIND

pub fun main(address: Address): String? {
    let name = FIND.reverseLookup(address)
    return name?.concat(".find")
}
`;

const findToAddress = `
import FIND from 0xFIND

pub fun main(name: String) : Address?  {
  return FIND.lookupAddress(name)
}
`;

const fnToAddress = `
import Flowns from 0xFN
import Domains from 0xFN
pub fun main(name: String): Address? {
  
  let prefix = "0x"
  let rootHash = Flowns.hash(node: "", lable: "fn")
  let nameHash = prefix.concat(Flowns.hash(node: rootHash, lable: name))
  let address = Domains.getRecords(nameHash)

  return address
}
`;

module.exports = {
  resolveAddressObject
}

