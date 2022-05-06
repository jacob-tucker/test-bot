import RaribleNFT from 0x01ab36aaf654a13e 
  import NonFungibleToken from 0x1d7e57aa55817448

  pub fun main(user: Address): Bool {
    if let collection = getAccount(user).getCapability(RaribleNFT.collectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      let arrayOfCommunityIsUtility: [UInt64] = [191970, 189230, 191923, 189713, 189264, 189752, 189244, 189722, 189710, 189707, 189698, 189436, 189439, 189465, 189259, 189255, 188995, 189231, 189440, 189465, 189442, 189436, 189223, 191984, 191988, 189214, 189051, 189239, 188908, 189274, 189264, 189263, 189243, 189239, 189231, 189230, 189223, 189222, 189214, 189212, 189200, 189065, 189051, 189043, 189026, 189043, 188986, 188975, 189029, 189024, 188969, 189026, 188975, 188965]
      let ids: [UInt64] = collection.getIDs()
      for nftId in arrayOfCommunityIsUtility {
        if ids.contains(nftId) {
          return true
        }
      }

    }
    return false
  
  } 