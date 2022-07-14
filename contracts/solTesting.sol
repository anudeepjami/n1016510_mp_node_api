// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

contract Testing{
    string public message = "Hi World";

    function setMessage(string memory newMessage) public{
        message = newMessage;
    }

}