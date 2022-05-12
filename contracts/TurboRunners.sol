// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract TurboRunners is ERC721A, Ownable {
	uint256 public MAX_MINTS;
	uint256 public MAX_MINT_PER_TRANSACTION;
	uint256 public MAX_SUPPLY;
	uint256 public mintRate;
	uint256 public timeDeployed;
	uint256 public allowPublicMintingAfter = 0;
	uint256 public allowWhiteListMintingAfter = 0;
	bytes32 public root;
	uint256 public revealDate = 0;
	bool public isPaused = false;
	string public notRevealedURI;
	string public baseURI;
	address public artist;
	uint256 royaltyFee = 5;

	constructor(
		uint256 _mintRate,
		uint256 _maxSupply,
		uint256 _maxMints,
		uint256 _maxMintsPerTransaction,
		uint256 _allowPublicMintingOn,
		uint256 _allowWhitelistMintingOn,
		bytes32 _root,
		uint256 _revealDate,
		string memory _initBaseURI,
		string memory _initNotRevealedURI,
		address _artist
	) ERC721A("Turbo Runners", "TBRNR") {
		if (_allowPublicMintingOn > block.timestamp) {
			allowPublicMintingAfter = _allowPublicMintingOn - block.timestamp;
		}
		if (_revealDate > block.timestamp) {
			revealDate = _revealDate - block.timestamp;
		}
		if (_allowWhitelistMintingOn > block.timestamp) {
			allowWhiteListMintingAfter =
				_allowWhitelistMintingOn -
				block.timestamp;
		}
		mintRate = _mintRate;
		MAX_SUPPLY = _maxSupply;
		MAX_MINTS = _maxMints;
		MAX_MINT_PER_TRANSACTION = _maxMintsPerTransaction;
		baseURI = _initBaseURI;
		notRevealedURI = _initNotRevealedURI;
		root = _root;
		artist = _artist;
		timeDeployed = block.timestamp;
	}

	function mint(bytes32[] memory _proof, uint256 quantity) external payable {
		require(
			block.timestamp >= allowWhiteListMintingAfter + timeDeployed,
			"Minting not allowed yet"
		);
		if (block.timestamp < allowPublicMintingAfter + timeDeployed) {
			require(
				isValid(_proof, keccak256(abi.encodePacked(msg.sender))),
				"Address not on Whitelist"
			);
		}
		require(!isPaused, "Minting is currently paused");
		require(
			quantity + _numberMinted(msg.sender) <= MAX_MINTS,
			"Exceeded the max limit per address"
		);
		require(
			totalSupply() + quantity <= MAX_SUPPLY,
			"Not enough tokens left"
		);
		require(msg.value >= (mintRate * quantity), "Not enough ether sent");
		require(
			quantity <= MAX_MINT_PER_TRANSACTION,
			"Max mint per transaction exceeded"
		);
		//Pay royalties to artist, send remainder to owner
		if (msg.value > 0) {
			uint256 royalty = (msg.value * royaltyFee) / 100;
			_payRoyalty(royalty);

			(bool success2, ) = payable(owner()).call{
				value: msg.value - royalty
			}("");
			require(success2);
		}
		_safeMint(msg.sender, quantity);
	}

	function withdraw() external payable onlyOwner {
		payable(owner()).transfer(address(this).balance);
	}

	function _baseURI() internal view override returns (string memory) {
		return baseURI;
	}

	function setMintRate(uint256 _mintRate) public onlyOwner {
		mintRate = _mintRate;
	}

	function setIsPaused(bool _isPaused) public onlyOwner {
		isPaused = _isPaused;
	}

	function transferFrom(
		address from,
		address to,
		uint256 tokenId
	) public payable override {
		if (msg.value > 0) {
			uint256 royalty = (msg.value * royaltyFee) / 100;
			_payRoyalty(royalty);

			(bool success2, ) = payable(from).call{
				value: msg.value - royalty
			}("");
			require(success2);
		}
		super.transferFrom(from, to, tokenId);
	}

	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId
	) public payable override {
		if (msg.value > 0) {
			uint256 royalty = (msg.value * royaltyFee) / 100;
			_payRoyalty(royalty);

			(bool success2, ) = payable(from).call{
				value: msg.value - royalty
			}("");
			require(success2);
		}
		super.safeTransferFrom(from, to, tokenId);
	}

	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId,
		bytes memory _data
	) public payable override {
		if (msg.value > 0) {
			uint256 royalty = (msg.value * royaltyFee) / 100;
			_payRoyalty(royalty);

			(bool success2, ) = payable(from).call{
				value: msg.value - royalty
			}("");
			require(success2);
		}
		super.safeTransferFrom(from, to, tokenId, _data);
	}

	function _payRoyalty(uint256 _royaltyFee) internal {
		(bool success1, ) = payable(artist).call{ value: _royaltyFee }("");
		require(success1);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		override
		returns (string memory)
	{
		if (block.timestamp <= revealDate + timeDeployed) {
			return notRevealedURI;
		}

		return super.tokenURI(tokenId);
	}

	function isValid(bytes32[] memory proof, bytes32 leaf)
		public
		view
		returns (bool)
	{
		return MerkleProof.verify(proof, root, leaf);
	}

	function setRoot(bytes32 _root) public onlyOwner {
		root = _root;
	}
}
