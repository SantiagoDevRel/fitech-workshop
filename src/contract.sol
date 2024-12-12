// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Fitech{
    // state variables
    address owner; // santiago's address

    // constructor
    constructor(){
      owner = msg.sender;
    }

    // writing functions
    function donate() public payable {
        // this function will receive ETH(funds)

        // address(this) --> address of this smart contract
        // .transfer --> is transfering the funds to (this)
        // msg.value --> taking the ETH that is being sent by the user
        payable(address(this)).transfer(msg.value);
    }

   
    function withdraw() public {
        // this function will withdraw the donations to Santiago

        // ONLY the owner can withdraw the funds
        require(msg.sender == owner, "You are not the owner");

        // this is fetching the current balance of the contract
        uint256 currentBalanceOfThisContract = balance();

        // this is sending the funds to 'owner'
        payable(owner).transfer(currentBalanceOfThisContract);

    }

    // reading functions  
    function balance() public view returns(uint256){
        // show the current balance of the contract
        return address(this).balance;
    }

    receive() external payable{}

}

// contract that will receive funds (ETH)
// the owner of the contract (ONLY Santiago)
// will be able to withdraw the funds
