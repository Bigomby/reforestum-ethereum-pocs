pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/access/Roles.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "./Counter.sol";

contract RFT is ERC721 {
  using Roles for Roles.Role;
  using Counter for Counter.Index;

  struct Certification {
    uint32 amount;        // Number of metric tons
    uint32 protocol;
    uint32 issuer;        // Entity issuing this certificate
    uint32 issued;        // Date of issue
    uint64 timeSpan;      // 10 years / 20 years / ...
  }

  struct Token {
    uint64 issued;        // Date of issue
    uint32 baseUnit;
    uint32 amount;        // Fraction of the base unit
    string geoJson;       // GeoJson representing the underlying plot of land
    mapping (uint => Certification) certifications;
  }

  string constant public name = "Reforestum Token";
  string constant public symbol = "RFT";

  // Admin role can manage operators and Operators can update token data
  Roles.Role private admin;
  Roles.Role private operators;

  mapping (uint => Token) tokenData;
  uint32 public totalArea;
  uint32 public occupiedArea;
  Counter.Index private tokenId;

  constructor(uint32 _totalArea) ERC721() public {
    totalArea = _totalArea;
    admin.add(msg.sender);
  }

  function requestToken(uint32 _baseUnit, uint32 _amount) public {
    // TODO Use safe math
    require(_baseUnit > 0 && _amount > 0, "Invalid input params");
    require(
      _baseUnit * _amount < totalArea - occupiedArea,
      "No enought area available"
    );

    uint id = tokenId.next();
    _mint(msg.sender, id);

    tokenData[id].issued = block.timestamp;
    tokenData[id].baseUnit = _baseUnit;
    tokenData[id].amount = _amount;
  }
}
