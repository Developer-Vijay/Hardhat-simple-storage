import { ethers, run, network } from "hardhat";
// require("dotenv").config();


async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract");
  const simpleStorage = await simpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed Contract: ${simpleStorage.address}`);
  // console.log(network.config)

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("I am under If");
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])

  }
  // update the value
  const currentValue = await simpleStorage.retrieve()
  console.log(currentValue);


  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const upadateValue = await simpleStorage.retrieve();
  console.log(upadateValue);
}

async function verify(contractAddress:String, args:any[]) {
  console.log("Verfying contract..");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e:any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Alrady Verified");
    }
    else {
      console.log(e);
    }
  }

}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});