import { initUseWagmiContracts } from "../../lib/use-wagmi-contracts";
import { abis } from "@lisk-scaffold-dapp/hardhat-ts"
import { getContractAddresses } from "./useContractAddresses";

const contractAddress = getContractAddresses();

const {WagmiContractsProvider, useContracts} = initUseWagmiContracts({
    SampleContract: {
        abi: abis.SampleContract,
        defaultAddress: contractAddress.SampleContract,
    },
    TodoList: {
        abi: abis.TodoList,
        defaultAddress: contractAddress.TodoList,
      },
})

export {
    WagmiContractsProvider,
    useContracts
}




