pragma solidity ^0.4.24;

import "./RFT.sol";

contract Certifications {
  struct Signature {
    uint8 v;
    bytes32 r;
    bytes32 s;
  }

  struct Certification {
    uint64 issued;
    uint64 expiration;
    Signature signature;
  }

  struct Issuer {
    string name;
    uint64 registered;
    uint64 expiration;
    mapping(uint => Certification) certifications;
  }

  mapping (address => Issuer) public issuers;
  RFT private rft;

  constructor(address _rft) public {
    rft = RFT(_rft);
  }

  function certifyToken(
    uint _tokenId,
    uint64 _expiration,
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) external {
    Issuer storage issuer = issuers[msg.sender];
    require(issuer.registered > block.timestamp, "Invalid issuer");
    require(block.timestamp < issuer.expiration, "Issuer expired");

    Certification storage certification = issuer.certifications[_tokenId];
    certification.expiration = _expiration;
    certification.issued = uint64(block.timestamp);
    certification.signature = Signature(_v, _r, _s);
  }

  function validateToken(
    uint _tokenId,
    address _issuer
  ) external view returns (uint64, uint64, uint8, bytes32, bytes32) {
    require(_tokenId != 0, "Invalid token id");
    require(_issuer != address(0), "Invalid issuer address");

    Issuer storage issuer = issuers[_issuer];
    require(issuer.registered < block.timestamp, "Invalid issuer");

    Certification storage certification = issuer.certifications[_tokenId];
    require(certification.issued < block.timestamp, "No certification found");

    address addr = _validateCertification(certification.signature, _tokenId);
    require(addr == _issuer, "Invalid signature");
    require(issuer.registered < certification.issued, "Invalid issuer");
    require(issuer.expiration > certification.issued, "Expired issuer");
    require(block.timestamp < certification.expiration, "Invalid certification");

    return (
      certification.issued,
      certification.expiration,
      certification.signature.v,
      certification.signature.r,
      certification.signature.s
    );
  }

  function _validateCertification(Signature _signature, uint _tokenId) internal view returns (address) {
    (uint64 issued, uint32 baseUnit, uint32 amount, string memory geoJson) = rft.getToken(_tokenId);
    bytes memory packed = abi.encodePacked(issued, baseUnit, amount, geoJson);
    bytes32 data = keccak256(packed);

    return ecrecover(data, _signature.v, _signature.r, _signature.s);
  }
}
