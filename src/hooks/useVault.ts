import { abi } from '@lukso/lsp-smart-contracts/artifacts/LSP9Vault.json';
import { useContract, useContractFactory } from "./useContract";

export function useVaultFactory() {
  return useContractFactory(abi);
}

export function useVault(address: string) {
  const vault = useContract(
    address,
    abi
  );

  return { vault };
}
