// SPDX-License-Identifier: GPL-3.0 

pragma solidity >= 0.7.0 < 0.9.0;

contract LotteryTicket {

    enum userStatus{Register, lottery, Winner}

    struct userInfo {
        address user;
        string name;
        uint price;
        userStatus status;
    }

    userInfo[] public users;
    uint count;
    address admin;
    uint lotteryWinner;
    address payable lotteryWinnerTra;

    uint num = 10;

    constructor(){
        admin = msg.sender;
    }

    event AllParticipate(userInfo[] data);

    function GetAllUsers() public {
        emit AllParticipate(users);
    }

    function AdminAcco() view public returns(address, uint) {
        return (admin, address(this).balance);
    }

    function payEther(string memory name) public payable {
        require(msg.value == 2 ether, "Do not register if you have not paid 2 ETH.");
        userInfo memory user = userInfo({
            user: msg.sender,
            name: name,
            price: msg.value,
            status: userStatus.Register
        });
        users.push(user);
        emit AllParticipate(users);
    }


    function AddLottery(uint userIndex) public  {
        require(admin == msg.sender, "You're not authorized to access admin functions.");
        require(users[lotteryWinner].status != userStatus.Winner,"A winner already exists if you don't participate.");
        users[userIndex].price = users[userIndex].price - 1 ether;
        users[userIndex].status = userStatus.lottery;
        emit AllParticipate(users);
    }

    function findWinner() public {
        require(admin == msg.sender, "You're not authorized to access admin functions.");
        lotteryWinner = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender, users.length))) % users.length;
        require(users.length > 2,"Please add a garterthen 2 participants.");
        // require(users[lotteryWinner].status == userStatus.lottery,"The event does not involve you.");
        users[lotteryWinner].status = userStatus.Winner;
        lotteryWinnerTra = payable(users[lotteryWinner].user);
        lotteryWinnerTra.transfer(address(this).balance); 
        delete users;
        emit AllParticipate(users);
    }

}