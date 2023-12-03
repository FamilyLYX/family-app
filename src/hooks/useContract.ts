import {
  Contract,
  ContractFactory,
  InterfaceAbi,
  JsonRpcProvider,
  JsonRpcSigner,
} from "ethers";
const rpcProvider = new JsonRpcProvider("https://rpc.testnet.lukso.network");

export const useContract = (
  target: string,
  abi: InterfaceAbi,
  provider: JsonRpcProvider | JsonRpcSigner = rpcProvider
) => new Contract(target, abi, provider);
export const useContractFactory = (abi: InterfaceAbi) =>
  new ContractFactory(abi, "0x", rpcProvider);
