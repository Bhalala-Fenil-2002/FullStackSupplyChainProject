// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.0.3 <=0.9.0;

contract Ownable{
    
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == admin, "Owner: Your not authenticated user.");
        _;
    }

    function isOwner() public view returns (address, bool) {
        return (msg.sender, admin == msg.sender);
    }

}