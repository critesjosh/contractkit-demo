

// Import ContractKit
const ContractKit = require('@celo/contractkit')

// Create a new instance of ContractKit, connecting to a local Celo node
const contractKit = ContractKit.newKit('http://localhost:8545')

// Specify an arbitrary recipient of the transaction
const recipient = '0xB9727f7f1e1f4a5229a49E260fBBBD410d10f2Ff'

// Specify an amount to trasnfer, and convert it to the appropriate units
const transferAmount = '0.10' 
const weiTransferAmount = contractKit.web3.utils.toWei(transferAmount, 'ether')

async function transferStableToken() {
  
  let accounts = await contractKit.web3.eth.getAccounts()
  contractKit.defaultAccount = accounts[0]

  // Get the stable token (cUSD) contract
  const stableToken = await contractKit.contracts.getStableToken()
  
  // Get + print the balance of the bank account
  const balance = await stableToken.balanceOf(accounts[0])
  console.log(`Stable Token balance of ${accounts[0]}: ${balance}`)
  
  // Transfer the specified amount to the specified recipient
  const tx = await stableToken.transfer(recipient, weiTransferAmount).send()
  
  // Get + print the transaction hash
  const hash = await tx.getHash()
  console.log(`Transaction hash`,hash)
  
  // Get + print the transaction receipt
  const receipt = await tx.waitReceipt()
  console.log(`Tranaction receipt`, receipt)
  
  // Get + print the new account balance
  const newBalance = await stableToken.balanceOf(accounts[0]);
  console.log(`Stable Token balance of ${accounts[0]}: ${newBalance}`)
}

transferStableToken()