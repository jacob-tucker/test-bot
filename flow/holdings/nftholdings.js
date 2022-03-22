const find = () => {
  return `
      import FIND from 0xFIND
      import Profile from 0xFIND

      pub fun main(address: Address): Int {

          let account=getAccount(address)
          let leaseCap = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)

          if !leaseCap.check() {
              return 0
          }

          let profile= Profile.find(address).asProfile()
          let leases = leaseCap.borrow()!.getLeaseInformation() 
          var time : UFix64?= nil
          var name :String?= nil
          for lease in leases {

              //filter out all leases that are FREE or LOCKED since they are not actice
              if lease.status != "TAKEN" {
                  continue
              }

              //if we have not set a 
              if profile.findName == "" {
                  if time == nil || lease.validUntil < time! {
                      time=lease.validUntil
                      name=lease.name
                  }
              }

              if profile.findName == lease.name {
                  return 1
              }
          }

          if name == nil {
              return 0
          } 
          return 1
      }
  `;
}

const geniacemetalmaneki = () => {
  return `
      import GeniaceNFT from 0xabda6627c70c7f52
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(GeniaceNFT.CollectionPublicPath).borrow<&GeniaceNFT.Collection{GeniaceNFT.GeniaceNFTCollectionPublic}>() {
              let ids = collection.getIDs()

              for id in ids {
                  let geniaceNFT = collection.borrowGeniaceNFT(id: id)!
                  if geniaceNFT.metadata.celebrityName == "METAL MANEKI" {
                      return 1
                  }
              }
          }

          return -1
      }
  `;
}

const geniacemanekigems = () => {
  return `
      import GeniaceNFT from 0xabda6627c70c7f52
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(GeniaceNFT.CollectionPublicPath).borrow<&GeniaceNFT.Collection{GeniaceNFT.GeniaceNFTCollectionPublic}>() {
              let ids = collection.getIDs()

              for id in ids {
                  let geniaceNFT = collection.borrowGeniaceNFT(id: id)!
                  if geniaceNFT.metadata.celebrityName == "MANEKI GEMS" {
                      return 1
                  }
              }
          }

          return -1
      }
  `;
}

const geniaceiconsofanime = () => {
  return `
      import GeniaceNFT from 0xabda6627c70c7f52
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(GeniaceNFT.CollectionPublicPath).borrow<&GeniaceNFT.Collection{GeniaceNFT.GeniaceNFTCollectionPublic}>() {
              let ids = collection.getIDs()

              for id in ids {
                  let geniaceNFT = collection.borrowGeniaceNFT(id: id)!
                  if geniaceNFT.metadata.celebrityName == "ICONS OF ANIME" {
                      return 1
                  }
              }
          }

          return -1
      }
  `;
}

const flovatar = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(/public/FlovatarCollection).borrow<&{Flovatar.CollectionPublic}>() {
              return collection.getIDs().length
          }

          return -1
      }
  `;
}

const flovatarape = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
            if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B35H"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatardevil = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B39H"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatarflotrotter = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
                  if(str == "C84" || str == "C85" || str == "C86"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatardroid = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
                  if(str == "B37H" || str == "B57H" || str == "B58H"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatarracer = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
                  if(str == "C133" || str == "C134" || str == "C135" || str == "C136" || str == "C137"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatarcat = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
                var count: Int = 0;
                let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
                
                for flovatar in flovatarsData {
                  if(flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B36H"){
                    count = count + Int(1)
                  }
                }
                
                return count
            }
            
            return -1
      }
  `;
}

const flovatarnaked = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            for flovatar in flovatarsData {
              let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(str == "C121"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarundead = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
              let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
              if(str == "B40H" || str == "B41H" || str == "B42H" || str == "B72H"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarpower = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
        if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
              let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(str == "C127" || str == "C128" || str == "C129" || str == "C130" || str == "C131" || str == "C132"){
                count = count + Int(1)
              }
            }
            
            return count
        }
        
        return -1
      }
  `;
}

const flovatarstarbattle = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
                let str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(str == "B66H" || str2 == "C166" || str2 == "C167" || str2 == "C168"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarsuit = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
                let str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(str == "C90" || str2 == "C173" || str2 == "C174" || str2 == "C175" || str2 == "C176" || str2 == "C177" || str2 == "C178" || str2 == "C179" || str2 == "C180"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarfind = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      import FIND from 0x097bafa4e0b48eef
      import Profile from 0x097bafa4e0b48eef
      
      pub fun main(address: Address): Int {
          
          let account=getAccount(address)
          
          if let collection = account.getCapability(/public/FlovatarCollection).borrow<&{Flovatar.CollectionPublic}>() {
              
          } else {
              return -1
          }
          
          let leaseCap = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)

          if !leaseCap.check() {
              return 0
          }

          let profile= Profile.find(address).asProfile()
          let leases = leaseCap.borrow()!.getLeaseInformation() 
          var time : UFix64?= nil
          var name :String?= nil
          for lease in leases {

              //filter out all leases that are FREE or LOCKED since they are not actice
              if lease.status != "TAKEN" {
                  continue
              }

              //if we have not set a 
              if profile.findName == "" {
                  if time == nil || lease.validUntil < time! {
                      time=lease.validUntil
                      name=lease.name
                  }
              }

              if profile.findName == lease.name {
                  return 1
              }
          }

          if name == nil {
              return 0
          } 
          return 1
      }
  `;
}

const flovatargirlpower = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: 3, upTo: 7)
                let str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(
                  (str2 == "C100" || str2 == "C101" || str2 == "C145" || str2 == "C115" || str2 == "C116" || str2 == "C204" || str2 == "C189")
                  &&
                  (str == "H295" || str == "H296" || str == "H297" || str == "H298" || str == "H299" || str == "H300" || str == "H334" || str == "H335" || str == "H336" || str == "H337" || str == "H338" || str == "H339" || str == "H371" || str == "H372" || str == "H373" || str == "H331" || str == "H332" || str == "H333" || str == "H356" || str == "H357" || str == "H358" || str == "H383" || str == "H384" || str == "H385" || str == "H386")
                  ){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarstoner = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let accessoryId: UInt64 = flovatar.accessoryId ?? 0
                let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(8), upTo: flovatar.metadata.combination.length - Int(4))
                let str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(7), upTo: flovatar.metadata.combination.length - Int(3))
              if(str == "M444" || str2 == "M444" || str == "M443" || str2 == "M443" || accessoryId == UInt64(15)){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarmustache = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: 7, upTo: 9)
              if(str != "Fx"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarfirst100 = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
              if(flovatar.id <= UInt64(100)){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarastronaut = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(str == "C158" || str == "C159" || str == "C160" || str == "C161" || str == "C162" || str == "C163" || str == "C164" || str == "C165"){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatarlegendary = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
              if(flovatar.metadata.legendaryCount > UInt8(0)){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const flovatargray = () => {
  return `
      import Flovatar from 0x921ea449dffec68a
      
      pub fun main(address: Address): Int {
          if let collection = getAccount(address).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
            var count: Int = 0;
            let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: address)
            
            for flovatar in flovatarsData {
                let strB = flovatar.metadata.combination.slice(from: 0, upTo: 3)
                let strH = flovatar.metadata.combination.slice(from: 3, upTo: 7)
                let strC = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
                let strC2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
              if(
                  (strB == "B47" || strB == "B67" || strB == "B36" || strB == "B71" || str == "B58")
                  &&
                  (strC == "C81" || strC == "C83" || strC == "C92" || strC == "C93" || strC == "C95" || strC == "C76" || strC == "C78" || strC2 == "C101" || strC2 == "C151" || strC2 == "C207" || strC2 == "C211" || strC2 == "C102" || strC2 == "C115" || strC2 == "C138" || strC2 == "C155" || strC2 == "C171" || strC2 == "C197" || strC2 == "C121" || strC2 == "C122" || strC2 == "C124" || strC2 == "C127" || strC2 == "C167" || strC2 == "C181")
                  &&
                  (strH == "H288" || strH == "H289" || strH == "H295" || strH == "H296" || strH == "H301" || strH == "H303" || strH == "H307" || strH == "H313" || strH == "H316" || strH == "H319" || strH == "H334" || strH == "H359" || strH == "H367" || strH == "H371" || strH == "H381" || strH == "H291" || strH == "H293" || strH == "H323" || strH == "H348" || strH == "H352" || strH == "H384" || strH == "H290" || strH == "H327" || strH == "H329" || strH == "H340" || strH == "H341")
                  ){
                count = count + Int(1)
              }
            }
            
            return count
          }
          
          return -1
      }
  `;
}

const dropchasepartner = () => {
  return `
      import Dropchase from 0x328670be4971a064
          pub fun main(account: Address): Int {
              let acct = getAccount(account)
              if let collectionRef = acct.getCapability(/public/DropchaseItemCollection).borrow<&{Dropchase.ItemCollectionPublic}>() {
                  var partnernum: Int = 0
                  let allIds = collectionRef.getIDs()
  
                  var a: Int = 0
                  while a < allIds.length {
                      let token = collectionRef.borrowItem(id: allIds[a])  
                                      ?? panic("Could not borrow a reference to the specified item")   
                      let data = token.data
                      let metadata = Dropchase.getStatMetaDataByField(statID: data.statID, field: "Partner") 
                      if (metadata == "true") {
                          partnernum = partnernum + 1
                      }
                      a = a + 1
                  }
                  return partnernum
              }

              return -1
          }
  `
}

const coolcatstotal = () => {
  return `
  import TopShot from 0x0b2a3299cc857e29

  // Returns the total # of moments the user has from Cool Cats
  pub fun main(account: Address): UInt64 {
  if let collection = getAccount(account).getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>() {
      let ids = collection.getIDs()
      var answer: UInt64 = 0
      for id in ids {
      let moment = collection.borrowMoment(id: id)!
      if moment.data.setID == 32 {
          answer = answer + 1
      }
      }
      return answer
  }

  return 0
  }
  `;
}

const coolcatsunique = () => {
  return `
  import TopShot from 0x0b2a3299cc857e29

  // Returns the total # of UNIQUE moments the user has from Cool Cats
  pub fun main(account: Address): UInt64 {
  if let collection = getAccount(account).getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>() {
      let ids = collection.getIDs()
      var answer: UInt64 = 0
      var coveredPlays: [UInt32] = []
      for id in ids {
      let moment = collection.borrowMoment(id: id)!
      if moment.data.setID == 32 && !coveredPlays.contains(moment.data.playID) {
          answer = answer + 1
          coveredPlays.append(moment.data.playID)
      }
      }
      return answer
  }
  
  return 0
  }
  `
}

const emeraldid = () => {
  return `
  import EmeraldIdentity from 0xEmeraldIdentity

  pub fun main(user: Address): Bool {
    if EmeraldIdentity.getDiscordFromAccount(account: user) != nil {
      return true
    }
    return false
  }
  `
}

const holdingScripts = {
  find,
  geniacemetalmaneki,
  geniacemanekigems,
  geniaceiconsofanime,
  flovatar,
  flovatarape,
  flovatardevil,
  flovatarflotrotter,
  flovatardroid,
  flovatarracer,
  flovatarcat,
  flovatarnaked,
  flovatarundead,
  flovatarpower,
  flovatarstarbattle,
  flovatarsuit,
  flovatarfind,
  flovatargirlpower,
  flovatarstoner,
  flovatarmustache,
  flovatarfirst100,
  flovatarastronaut,
  flovatarlegendary,
  flovatargray,
  dropchasepartner,
  coolcatstotal,
  coolcatsunique,
  emeraldid
}

module.exports = {
  holdingScripts
}