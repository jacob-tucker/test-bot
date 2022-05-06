const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const getMomentsInSet = async (account, setName) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(setName, t.String)
      ])
    ]).then(fcl.decode);

    return result;
  } catch (e) {
    console.log(e);
    return { error: true, message: 'The account does not have TopShots.' };
  }
}

const scriptCode = `
import TopShot from 0x0b2a3299cc857e29

pub fun main(account: Address, setName: String): Result {
  let setID = TopShot.getSetIDsByName(setName: setName)?.removeFirst()!
  let setData = TopShot.getSetData(setID: setID)!
  let collection = getAccount(account).getCapability(/public/MomentCollection)
                      .borrow<&{TopShot.MomentCollectionPublic}>()
                      ?? panic("GG")
  let ids = collection.getIDs()
  let moments: [MomentData] = []
  let playIds: [UInt32] = []
  for id in ids {
    let moment = collection.borrowMoment(id: id)!
    let playID = moment.data.playID
    if moment.data.setID == setID && !playIds.contains(playID) {
      let play: {String: String} = TopShot.getPlayMetaData(playID: playID)!
      let momentData = MomentData(_serialNumber: moment.data.serialNumber, _player: play["FullName"]!, _team: play["TeamAtMoment"]!, _date: play["DateOfMoment"]!, _playCategory: play["PlayCategory"]!, _setName: setName)
      moments.append(momentData)
      playIds.append(playID)
    }
  }
  return Result(_owner: account, _setData: setData, _moments: moments)
}

pub struct Result {
  pub let owner: Address
  pub let setData: TopShot.QuerySetData
  pub let moments: [MomentData]

  init(_owner: Address, _setData: TopShot.QuerySetData, _moments: [MomentData]) {
    self.owner = _owner
    self.setData = _setData
    self.moments = _moments
  }
}

pub struct MomentData {
  pub let serialNumber: UInt32
  pub let player: String
  pub let team: String
  pub let date: String
  pub let playCategory: String
  pub let setName: String

  init(_serialNumber: UInt32, _player: String, _team: String, _date: String, _playCategory: String, _setName: String) {
    self.serialNumber = _serialNumber
    self.player = _player
    self.team = _team
    self.date = _date
    self.playCategory = _playCategory
    self.setName = _setName
  }
}
`;

module.exports = {
  getMomentsInSet
}