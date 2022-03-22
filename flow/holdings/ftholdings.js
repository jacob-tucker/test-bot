const ft = ({ contractName, contractAddress, path }) => {
  return `
      import FungibleToken from 0xf233dcee88fe0abe
      import ${contractName} from ${contractAddress}
      pub fun main(address: Address): UFix64 {
          if let vault = getAccount(address).getCapability(${path}).borrow<&${contractName}.Vault{FungibleToken.Balance}>() {
              return vault.balance
          } else {
              if let vaultPublic = getAccount(address).getCapability(${path}).borrow<&{FungibleToken.Balance}>() {
                  if vaultPublic.getType().identifier == "A.${contractAddress.slice(2)}.${contractName}.Vault" {
                      return vaultPublic.balance
                  }
              }
          }

          return 0.0
      }
  `;
}

const holdingScripts = {
  ft
}

module.exports = {
  holdingScripts
}