// SPDX-License-Identifier: U
pragma solidity ^0.8.13;

contract ScavengerACH {

    address payable public owner;

    struct gameDetails {
        uint256 participationFee;
        mapping(address => bytes32) playerProfile;
        mapping(string => uint256) gamePot;
    }

    gameDetails game;

    constructor() payable {
        owner = payable(address(this));
        game.participationFee = 1 ether;

    }

    function participantDepositFunds(string memory roomId) public payable {
        require(msg.value == game.participationFee);
        (bool result, ) = owner.call{value: msg.value}("");
        game.playerProfile[msg.sender] = keccak256(abi.encodePacked(roomId));
        game.gamePot[roomId] += msg.value;
        require(result);
    }

    function winnerWithdrawFunds(string memory roomId) public payable {
        require(owner == address(this));
        require(game.playerProfile[msg.sender] == keccak256(abi.encodePacked(roomId)));
        game.playerProfile[msg.sender] = 0;
        (bool result, ) = payable(msg.sender).call{value: game.gamePot[roomId]}("");
        delete game.gamePot[roomId];
        require(result);
    }

    function clearPlayer() public {
        game.playerProfile[msg.sender] = 0;
    }

    receive() external payable {}

}
