import { contractAddresses } from "@lisk-scaffold-dapp/hardhat-ts"

import { getEnv } from "../../../src/utils/getEnv"
export function getContractAddresses() {
    const env = getEnv();

    if (env === "development") {
        return contractAddresses.localhost;
      }
    
      throw new Error(`Contract addresses not found for env: ${env}`);
      
}