// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.3.0 <=0.9.0;

import  "./isOwner.sol";

contract ItemManager is Ownable {
    
    enum itemStatus {
        hide, show
    }

    struct itemInfo {
        string ids;
        itemStatus status;
    }

    itemInfo[] public items;

    event TestData(itemInfo[] items); 

    function AddItem(string memory itemid) public onlyOwner {
        itemInfo memory item = itemInfo({
            ids: itemid,
            status: itemStatus.show
        });
        items.push(item);
    }

    function ItemsData() public  {
        emit TestData(items);
        // return items;
    }

}