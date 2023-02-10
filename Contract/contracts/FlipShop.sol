// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ItemNFT_V1 is ERC721Enumerable, Ownable {
    uint256 public tokenId = 1000;
    address public AdminAddress;
    mapping(address => bool) public whitelistedAddresses;
    mapping(uint256 => Warranty) TokenWarranty;
    mapping(uint256 => Product) TokenProduct;
    mapping(string => uint256) SerialNumberTokenId;

    struct Product {
        string ProductId;
        string ProductName;
        string Category;
        string ProductSerialNumber;
        uint256 ProductPurchaseDate;
        uint256 ProductExpiryDate;
        uint256 ProductwarrantyDuration;
        uint256 ProductPrice;
    }

    struct Warranty {
        uint256 ProductPurchaseDate;
        string ProductSerialNumber;
        uint256 ProductExpiryDate;
    }

    struct NFTDetails {
        uint256 tokenId;
        Warranty warrentyDetails;
    }

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        AdminAddress = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == AdminAddress, "Not Authorized");
        _;
    }

    modifier onlyWhitelisted() {
        require(whitelistedAddresses[msg.sender], "Not Authorized ");
        _;
    }

    function mint(
        string memory _productId,
        string memory _productName,
        string memory _category,
        uint256 _productWarrantyDuration,
        uint256 _productPrice,
        address _ownerAddress,
        string memory _productSerialNumber
    ) public onlyWhitelisted {
        require(_ownerAddress == address(_ownerAddress), "Invalid address");

        tokenId = tokenId + 1;

        Product memory ProductInfo = Product({
            ProductId: _productId,
            ProductName: _productName,
            ProductSerialNumber: _productSerialNumber,
            Category: _category,
            ProductwarrantyDuration: _productWarrantyDuration * 1 days,
            ProductPurchaseDate: block.timestamp,
            ProductExpiryDate: block.timestamp +
                _productWarrantyDuration *
                1 days,
            ProductPrice: _productPrice
        });

        Warranty memory ProductWarranty = Warranty({
            ProductPurchaseDate: block.timestamp,
            ProductExpiryDate: block.timestamp +
                _productWarrantyDuration *
                1 days,
            ProductSerialNumber: _productSerialNumber
        });

        TokenProduct[tokenId] = ProductInfo;

        TokenWarranty[tokenId] = ProductWarranty;

        SerialNumberTokenId[_productSerialNumber] = tokenId;

        _safeMint(_ownerAddress, tokenId);
    }

    function getProductInfo(uint256 _tokenId)
        public
        view
        returns (Product memory)
    {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Product memory p = TokenProduct[_tokenId];
        return p;
    }

    function getWarrentyInfo(uint256 _tokenId)
        public
        view
        returns (Warranty memory)
    {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Warranty memory w = TokenWarranty[_tokenId];
        return w;
    }

    function isInWarrenty(uint256 _tokenId) public view returns (bool) {
        require(_tokenId <= tokenId, "Invalid Token Id");
        Warranty memory w = TokenWarranty[_tokenId];
        return block.timestamp <= w.ProductExpiryDate;
    }

    function getAllNftTokenIdsOfUser(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balanceOfUser = balanceOf(_address);
        uint256[] memory _allTokensOfUser = new uint256[](balanceOfUser);
        for (uint8 i = 0; i < balanceOfUser; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(_address, i);
            _allTokensOfUser[i] = _tokenId;
        }

        return _allTokensOfUser;
    }

    function getAllNftsOfUser(address _address)
        public
        view
        returns (NFTDetails[] memory)
    {
        uint256 balanceOfUser = balanceOf(_address);
        NFTDetails[] memory _allNFTDetailsOfUser = new NFTDetails[](
            balanceOfUser
        );
        for (uint8 i = 0; i < balanceOfUser; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(_address, i);
            Warranty memory w = getWarrentyInfo(_tokenId);
            _allNFTDetailsOfUser[i] = NFTDetails({
                tokenId: _tokenId,
                warrentyDetails: w
            });
        }

        return _allNFTDetailsOfUser;
    }

    function getTokenIdFromSerialNo(string memory _serialNo)
        public
        view
        returns (uint256)
    {
        return SerialNumberTokenId[_serialNo];
    }

    function whilelistAddress(address _address) public onlyAdmin {
        require(!whitelistedAddresses[_address], "Already whitelisted");
        whitelistedAddresses[_address] = true;
    }
}
