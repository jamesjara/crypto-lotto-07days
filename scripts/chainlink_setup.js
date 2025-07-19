// chainlink_setup.js
// Script to register 7 Days Lotto with Chainlink Automation after deploying (Polygon version)

const { ethers } = require("hardhat");

const keeperRegistryAddress = "0x02777053d6764996e594c3E88AF1D58D5363a2e6"; // Polygon Keeper Registry
const keeperRegistryABI = [
  "function registerUpkeep(address target, uint32 gasLimit, address admin, bytes checkData, string memory name, bytes memory offchainConfig) public returns (uint256 id)",
  "function checkUpkeep(bytes calldata checkData) external view returns (bool upkeepNeeded, bytes memory performData)",
  "function performUpkeep(bytes calldata performData) external"
];

async function main() {
  const [deployer] = await ethers.getSigners();

  const lottoAddress = "0xYourLottoContractAddress"; // Replace with your deployed contract address
  const upkeepName = "7DaysLotto-Upkeep";
  const gasLimit = 500000;
  const checkData = "0x"; // Empty if not used
  const offchainConfig = "0x"; // Empty if not used

  const keeperRegistry = new ethers.Contract(
    keeperRegistryAddress,
    keeperRegistryABI,
    deployer
  );

  const tx = await keeperRegistry.registerUpkeep(
    lottoAddress,
    gasLimit,
    deployer.address,
    checkData,
    upkeepName,
    offchainConfig
  );

  const receipt = await tx.wait();
  console.log("Upkeep registered for 7 Days Lotto:", receipt.transactionHash);

  // Enable Automation by calling setTrustedCaller with the KeeperRegistry address
  const lottoContract = await ethers.getContractAt("SevenDaysLotto", lottoAddress);
  const tx2 = await lottoContract.setTrustedCaller(keeperRegistryAddress);
  await tx2.wait();
  console.log("Trusted caller set to Keeper Registry");

  // Optional: verify minimum participant requirement is enforced
  const currentParticipants = await lottoContract.getParticipants();
  const requiredMin = 1000;
  console.log(`Current participants: ${currentParticipants.length}`);
  if (currentParticipants.length < requiredMin) {
    console.log(`⚠️ Warning: Minimum of ${requiredMin} participants required to trigger the lottery.`);
  } else {
    console.log("✅ Minimum participant threshold met.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
