pragma solidity ^0.6.4;
// We have to specify what version of compiler this code will compile with

contract Voting {

  mapping (bytes32 => uint256) public votesReceived;

  // Solidity doesn't allow an array of strings to be passed in the constructor.
  // We will use an array of bytes32 instead to store the list of candidates
  bytes32[] public candidateList;

  // This is the constructor which will be called once when you
  // deploy the contract to the blockchain. When we deploy the contract,
  // we will pass an array of candidates who will be contesting in the election
  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) view public returns (uint256) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  // Checks if the candidate exist in the candidate list or not 
  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}