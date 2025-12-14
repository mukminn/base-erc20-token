const hre = require("hardhat");

async function main() {
  console.log("Deploying BaseToken...");

  // Token configuration
  const tokenName = "Base Token";
  const tokenSymbol = "BASE";
  const initialSupply = hre.ethers.parseEther("1000000"); // 1,000,000 tokens

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Deploy the contract
  const BaseToken = await hre.ethers.getContractFactory("BaseToken");
  const baseToken = await BaseToken.deploy(tokenName, tokenSymbol, initialSupply);

  await baseToken.waitForDeployment();
  const address = await baseToken.getAddress();

  console.log("\n=== Deployment Summary ===");
  console.log("Token Name:", tokenName);
  console.log("Token Symbol:", tokenSymbol);
  console.log("Initial Supply:", hre.ethers.formatEther(initialSupply), tokenSymbol);
  console.log("Contract Address:", address);
  console.log("Deployer Address:", deployer.address);
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);

  // Verify contract on BaseScan (if API key is configured)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nWaiting for block confirmations...");
    await baseToken.deploymentTransaction().wait(5);

    try {
      console.log("Verifying contract on BaseScan...");
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [tokenName, tokenSymbol, initialSupply],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
