// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BaseToken
 * @dev Simple ERC20 token implementation for Base blockchain
 * @notice This contract implements a standard ERC20 token with burnable and ownable features
 */
contract BaseToken is ERC20, ERC20Burnable, Ownable {
    /**
     * @dev Constructor that mints initial supply to the deployer
     * @param name The name of the token
     * @param symbol The symbol of the token
     * @param initialSupply The initial supply of tokens to mint (in wei)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Allows the owner to mint new tokens
     * @param to The address to mint tokens to
     * @param amount The amount of tokens to mint (in wei)
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
