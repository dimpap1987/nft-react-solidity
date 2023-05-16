// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AwesomeNFT is ERC721URIStorage, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private totalItems;

    // Token Uri properties
    string public uriPrefix;
    string public uriSuffix = ".json";
    string private baseURI;
    //
    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 1000;
    uint256 public totalNft;
    bool public paused = false;

    struct MintedStruct {
        uint256 id;
        address buyer;
        uint256 cost;
        string tokenUri;
        uint256 timestamp;
    }

    MintedStruct[] minted;

    event Minted(
        uint256 id,
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uriPrefix,
        uint256 _totalNft
    ) ERC721(_name, _symbol) {
        setBaseURI(_uriPrefix);
        setTotalNft(_totalNft);
    }

    function mint() public payable {
        require(!paused, "NFTs under maintenance!");
        totalItems.increment();
        uint tokenId = totalItems.current();

        require(tokenId <= maxSupply, "Sorry, all NFTs have been minted!");
        require(msg.value >= cost, "Ether too low for minting!");

        _safeMint(msg.sender, tokenId);

        minted.push(
            MintedStruct(
                tokenId,
                msg.sender,
                msg.value,
                convertToBaseURI(tokenId.toString()),
                block.timestamp
            )
        );

        emit Minted(
            tokenId,
            msg.sender,
            msg.value,
            convertToBaseURI(tokenId.toString()),
            block.timestamp
        );
    }

    function tokenURI(
        uint256 _tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return convertToBaseURI(_tokenId.toString());
    }

    function setBaseURI(string memory _uriPrefix) public onlyOwner {
        uriPrefix = _uriPrefix;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uriPrefix;
    }

    function setTotalNft(uint256 _totalNft) public onlyOwner {
        totalNft = _totalNft;
    }

    function setPause(bool _state) public onlyOwner {
        paused = _state;
    }

    function convertToBaseURI(
        string memory _tokenId
    ) private view returns (string memory) {
        return
            bytes(_baseURI()).length > 0
                ? string(abi.encodePacked(_baseURI(), _tokenId, uriSuffix))
                : "";
    }

    function getMintedNFTs() public view returns (MintedStruct[] memory) {
        return minted;
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
