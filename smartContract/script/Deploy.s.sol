// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/BaseSafeFactory.sol";

contract Deploy is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Load addresses from environment
        address token = vm.envAddress("TOKEN_ADDRESS");
        address treasury = vm.envAddress("TREASURY_ADDRESS");
        
        require(token != address(0), "TOKEN_ADDRESS not set");
        require(treasury != address(0), "TREASURY_ADDRESS not set");

        vm.startBroadcast(deployerPrivateKey);

        BaseSafeFactory factory = new BaseSafeFactory(token, treasury);
        console.log("Factory deployed at:", address(factory));
        console.log("Using token:", token);
        console.log("Using treasury:", treasury);

        vm.stopBroadcast();
    }
}