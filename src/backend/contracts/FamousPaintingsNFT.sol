// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FamousPaintingNFT is ERC1155, Ownable, Pausable, ERC1155Supply {
    uint256 public mintPrice = 0.01 ether;
    uint256 public differentKinds = 10;
    mapping(uint256 => uint256) public tokenMaxSupplies;

    constructor()
        ERC1155("ipfs://QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/")
    {
        tokenMaxSupplies[1] = 5;
        tokenMaxSupplies[2] = 3;
        tokenMaxSupplies[3] = 3;
        tokenMaxSupplies[4] = 3;
        tokenMaxSupplies[5] = 3;
        tokenMaxSupplies[6] = 2;
        tokenMaxSupplies[7] = 2;
        tokenMaxSupplies[8] = 2;
        tokenMaxSupplies[9] = 1;
        tokenMaxSupplies[10] = 1;
    }

    function mint(uint256 id, uint256 amount) public payable whenNotPaused {
        require(id != 0 && id <= differentKinds, "Invalid ID...");
        require(
            totalSupply(id) + amount <= tokenMaxSupplies[id],
            "Max supply reached"
        );
        require(msg.value >= mintPrice * amount, "Not enough Ether...");
        _mint(msg.sender, id, amount, "");
    }

    function uri(uint256 _id) public view override returns (string memory) {
        require(exists(_id), "URI: nonexistent token");

        return
            string(
                abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json")
            );
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
