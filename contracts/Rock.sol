pragma solidity ^0.4.11;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Rock {
	Struct Interaction {
		array bool[52] player1Results;
		array bool[52] player2Results;
		address player1;
		address player2;
		uint player2FailureCount;
		uint player1FailureCount;
		uint periodLength;
		uint periodCount;
		uint periodOn;
	}

	mapping (address => Interaction) public interactions;
	address public owner;
	uint public periodLength;

	// event (address indexed _from, address indexed _to, uint256 _value);

	function Rock() {
		owner = msg.sender;
	}

	function startInteraction(uint playerAmounts, address _player1, address _player2, uint _periodLength = 1 weeks, uint _periodCount = 52) 
		payable 
		external 
	{
		Interaction({
			player1 = _player1,
			player2 = _player2,
			player1FailureCount = 0,
			player2FailureCount = 0,
			periodOn = 0,
			periodLengh = _periodLength,
			periodCount = _periodCount,
		});
		
	}

	function nextPeriod(bool _player1Result, bool _player2Result) 
		external
	{
		Interaction current = interactions[msg.sender];
		if (_player1Result == false)
			current.player1FailureCount += 1;
		if (_player2Result == false)
			current.player2FailureCount += 1;
		current.Player1Results[current.periodOn] = _player1Result;
		current.Player2Results[current.periodOn] = _player2Result;
		current.periodOn += 1;
	}

	function getInteractionResults()
		returns (bytes32[], bytes23[])
	{
		Interaction current = interactions[msg.sender];
		
	}



}
