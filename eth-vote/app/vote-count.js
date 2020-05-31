#!/usr/bin/env node

const fs = require("fs")
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")

const abi = JSON.parse(fs.readFileSync('app/distSol/Voting_sol_Voting.abi').toString())
const contract = new web3.eth.Contract(abi)
const smartContractAddress = "0x82f3C49219E1AE7fA3B561a50872Abe9c72Abd7B"

// the contract address
contract.options.address = smartContractAddress
const candidates = ['Abdelaziz Bouteflika', 'Louiza Hanoun', 'Moussa Touati', 'Ali Fawzi Rebaine', 'Ali Benflis']

console.log("[*] Number of votes for each candidate: \n");
candidates.forEach(candidate => {
  
  // invode the totalVotesFor method in tha smart contract
  contract.methods.totalVotesFor(web3.utils.asciiToHex(candidate)).call().then( votes => {
    console.log("[+] " + candidate.padEnd(25, ' ') + "has " + votes + " votes.");
  })
})
