import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config(); // to config env into the hardhat

// lists the address and balance in the ethereum network
task("accounts", "List of all accounts and balances", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners(); // accounts present in hardhat local blockchain
  
  for(const account of accounts) {
    const address = await account.getAddress(); // get the public address of signer
    const balance = await hre.ethers.provider.getBalance(address); // get the balance present in each account address
    console.log(address + ":" + hre.ethers.formatEther(balance)); // format the wei into ether tokens
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {}, // to config the hardhat network
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, // testnet provider url
      accounts: [process.env.HARDHAT_PRIVATE_KEY as string] // private key
    }
  }
};

export default config;
