// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 99;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mint() public payable {
        uint256 supply = totalSupply();
        require(supply <= maxSupply, "Sorry, all NFTs have been minted!");
        require(msg.value > 0 ether, "Ether too low for minting!");

        if (msg.sender != owner()) {
            require(msg.value >= cost);
        }

        _safeMint(msg.sender, supply + 1);
    }
}
