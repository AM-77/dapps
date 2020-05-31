#!/usr/bin/env node

const fs = require("fs")
const Web3 = require('web3')
const web3 = new Web3("http://localhost:8545")
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const abi = JSON.parse(fs.readFileSync('app/distSol/Voting_sol_Voting.abi').toString())
const contract = new web3.eth.Contract(abi)
contract.options.address = "0x82f3C49219E1AE7fA3B561a50872Abe9c72Abd7B"
const candidates = ['Abdelaziz Bouteflika', 'Louiza Hanoun', 'Moussa Touati', 'Ali Fawzi Rebaine', 'Ali Benflis']


rl.question("[*] Enter your account address: ", (address) => { 

  if (address.length === 42 ){
    console.log("[*] Select one of these candidates \n ")
    candidates.forEach((candidate, index) => { console.log(`[${index + 1}] ${candidate}`) })

    rl.question("\n\n[*] Enter your candidate number: ", (candidate) => {

        const candidateNumber = parseInt(candidate)
        if (parseInt(candidate) > 0 && parseInt(candidate) < 6 ) {
          try {
            contract.methods.voteForCandidate(web3.utils.asciiToHex(candidates[candidateNumber - 1]))
              .send({from: address}).then((f) => {
                console.log('[+] Your vote have been applied.')
                process.exit(0)
              })
          } catch (e) {
            console.log("[-] Ann error occured: ", e)
            process.exit(1)
          }
        } else {
          console.log("[!] The selected condidate does not exist.")
          process.exit(1)
        }

    })

  } else {
    console.log("[!] Unvalid address.") 
    process.exit(1)
  }

})

rl.on("close", () => { process.exit(0) })