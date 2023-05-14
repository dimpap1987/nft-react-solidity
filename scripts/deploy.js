const { ethers } = require('hardhat')
const fs = require('fs')

async function main({contractName, tokenName, tokenSymbol}) {

  const contract_name = contractName
  const Contract = await ethers.getContractFactory(contract_name)
  const contract = await Contract.deploy(tokenName, tokenSymbol)

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

const contract = {
  contractName: 'MyNFT',
  tokenName: 'amazing name',
  tokenSymbol: 'ANFT'
}

main(contract).catch((error) => {
  console.error(error)
  process.exitCode = 1
})
