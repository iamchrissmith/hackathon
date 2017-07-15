pragma solidity ^0.4.11;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract Rock {
	struct Interaction {
		bool[] player1Results;
		bool[] player2Results;
		address player1;
		address player2;
		uint player2FailureCount;
		uint player1FailureCount;
		uint periodLength;
		uint periodCount;
		uint periodOn;
		uint amountLost;
		uint playerAmount;
		address charity;
		bool interactionOver;
	}

	mapping (address => Interaction) public interactions;
	address public owner;
	uint public periodLength;

	function Rock()
		public
	{
		owner = msg.sender;
	}

	function startInteraction(uint _playerAmount, address _player1, address _player2, uint _periodLength, uint _periodCount, address _charity) 
		payable
		external 
	{
		uint periodLength = _periodLength;
		if (_periodLength == 0)
			periodLength = 1 weeks;
		interactions[msg.sender] = Interaction({
			player1Results: new bool[](52),
			player2Results: new bool[](52),
			player1: _player1,
			player2: _player2,
			player1FailureCount: 0,
			player2FailureCount: 0,
			periodLength: periodLength,
			periodCount: _periodCount,
			periodOn: 0,
			amountLost: 0,
			playerAmount: _playerAmount,
			charity: _charity,
			interactionOver: false
		});
	}

	function nextPeriod(bool _player1Result, bool _player2Result) 
		external
	{
		Interaction current = interactions[msg.sender];
		if (current.interactionOver == true)
			revert();
		if (_player1Result == false)
			current.player1FailureCount += 1;
		if (_player2Result == false)
			current.player2FailureCount += 1;
		if (_player1Result || _player2Result) {
			current.amountLost += 2;
			current.charity.transfer(2*10**18);
		}
		current.player1Results[current.periodOn] = _player1Result;
		current.player2Results[current.periodOn] = _player2Result;
		current.periodOn += 1;
		if (current.periodOn == 52) 
			endInteraction(current);
	}

	function endInteraction(Interaction current)
		private
	{
		current.interactionOver = true;
	}

	function getInteractionResults()
		constant
		external
		returns (bool[], bool[])
	{
		Interaction current = interactions[msg.sender];
		return (current.player1Results, current.player2Results);
	}

	function getFailureCounts()
		constant
		external
		returns (uint, uint)
	{
		Interaction current = interactions[msg.sender];
		return (current.player1FailureCount, current.player2FailureCount);
	}
}
