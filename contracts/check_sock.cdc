import RaribleNFT from 0x01ab36aaf654a13e 
import NonFungibleToken from 0x1d7e57aa55817448

pub fun main(): [UInt64] {
  let collection = getAccount(0x99bd48c8036e2876).getCapability(RaribleNFT.collectionPublicPath)
                      .borrow<&{NonFungibleToken.CollectionPublic}>()
                      ?? panic("Shit")

  return collection.getIDs()
}