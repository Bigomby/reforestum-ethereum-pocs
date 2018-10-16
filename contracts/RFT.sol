pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

import "./Counter.sol";

contract RFT is ERC721 {
  using Counter for Counter.Index;

  struct Token {
    uint64 issued;
    uint32 baseUnit;
    uint32 amount;
    string geoJson;
  }

  uint32 public totalArea;
  uint32 public occupiedArea;

  Counter.Index private tokenId;
  mapping (uint => Token) private tokens;

  constructor(uint32 _totalArea) ERC721() public {
    totalArea = _totalArea;
  }

  function requestToken(uint32 _baseUnit, uint32 _amount) public {
    // TODO Use safe math
    require(_baseUnit > 0 && _amount > 0, "Invalid input params");
    require(
      _baseUnit * _amount < totalArea - occupiedArea,
      "No enought area available"
    );

    // NOTE this computation does not goes here, maybe should be done after
    // certification
    occupiedArea += _baseUnit * _amount;

    uint id = tokenId.next();
    _mint(msg.sender, id);

    tokens[id] = Token({
      issued: uint64(block.timestamp),
      baseUnit: _baseUnit,
      amount: _amount,
      geoJson: ""
    });
  }

  function getToken(
    uint _tokenId
  ) public view returns (uint64 issued, uint32 baseUnit, uint32 amount, string geoJson) {
    Token memory token = tokens[_tokenId];
    require(token.issued > 0, "Invalid token id");

    return (token.issued, token.baseUnit, token.amount, token.geoJson);
  }

  // TODO
  function() public {}
}
