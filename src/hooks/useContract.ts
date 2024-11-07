import {
  Contract,
  ContractFactory,
  InterfaceAbi,
  JsonRpcProvider,
  JsonRpcSigner,
} from 'ethers6';
export const readerRpcProvider = new JsonRpcProvider(
  import.meta.env.VITE_RPC_PROVIDER
);

export const useContract = (
  target: string,
  abi: InterfaceAbi,
  provider: JsonRpcProvider | JsonRpcSigner = readerRpcProvider
) => new Contract(target, abi, provider);
export const useContractFactory = (abi: InterfaceAbi) =>
  new ContractFactory(abi, '0x', readerRpcProvider);
