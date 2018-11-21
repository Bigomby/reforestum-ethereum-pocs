const RFT = artifacts.require("./RFT.sol");
const Certifications = artifacts.require("./Certifications.sol");

const TOTAL_AREA = process.env.REFORESTUM_TOKEN_TOTAL_AREA || 10000;

module.exports = async function(deployer) {
  const { address } = await deployer.deploy(RFT, TOTAL_AREA).await;
  await deployer.deploy(Certificationss, address).await;
};
