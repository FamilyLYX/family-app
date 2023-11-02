import { Contract, BrowserProvider, FunctionFragment, TransactionRequest, Interface, formatEther } from 'ethers';

import { abi as ExtensionABI } from 'family-contracts/artifacts/contracts/OrderExtension.sol/OrderExtension.json';
import { abi as PlaceholderABI } from 'family-contracts/artifacts/contracts/AssetPlaceholder.sol/AssetPlaceholder.json';
import { abi as AssetABI } from 'family-contracts/artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json';
import { abi as ProfileABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { abi as KeyManagerABI } from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { useToasts } from 'react-toast-notifications';

export const ExtensionInterface = new Interface(ExtensionABI);
export const PlaceholderInterface = new Interface(PlaceholderABI);
export const AssetInterface = new Interface(AssetABI);
export const ProfileInterface = new Interface(ProfileABI);
export const KeyManagerInterfae = new Interface(KeyManagerABI);

class FamilyError extends Error {
  constructor(name: string) {
    super();

    this.name = name;
  }
}

function parseTransactionError (error: any) {
  console.error(error);

  if (!error.data) {
    return error;
  }

  // const parsedError = ExtensionInterface.parseError(error.data);
  // const placeholderError = PlaceholderInterface.parseError(error.data);
  // const assetError = AssetInterface.parseError(error.data);
  // const profileError = ProfileInterface.parseError(error.data);
  // const keyManagerError = KeyManagerInterfae.parseError(error.data);

  const MatchingInterface = [ExtensionInterface, PlaceholderInterface, AssetInterface, ProfileInterface, KeyManagerInterfae].find((_interface) => {
    return _interface.parseError(error.data) !== null
  });
  
  const parsedError = MatchingInterface?.parseError(error.data);

  if (!parsedError) {
    return error;
  }

  return new FamilyError(parsedError.name);
}

export function useTransactionSender () {
  const provider = new BrowserProvider(window.ethereum);
  const { addToast } = useToasts();

  async function sendTransaction (contract: Contract, functionName: string | FunctionFragment, args: unknown[]) {
    const signer = await provider.getSigner();

    return contract.connect(signer).getFunction(functionName)(...args);
  }

  async function executeTransactionRequest (transactionReq: TransactionRequest) {
    const signer = await provider.getSigner();
    const valueRequired = transactionReq.value;
    const address = localStorage.getItem('family:connected:wallet');
    const balance = await provider.getBalance(address as string);

    if (Number(balance) < Number(valueRequired)) {
      throw new Error(`You do not have sufficient LYX balance for complete this order. Your balance is ${formatEther(balance)}`);
    }

    addToast('sending transaction', { appearance: 'info', autoDismiss: true });

    try {
      const txnResponse = await signer.sendTransaction(transactionReq);

      addToast('sent transaction', { appearance: 'info', autoDismiss: true });

      return txnResponse
    }
    catch (_err: any) {
      if (_err.code === 'ACTION_REJECTED') {
        throw new Error('Transaction rejected by user');
      }

      const error =  parseTransactionError(_err);

      addToast(`transaction failed: ${error.name}`);

      throw error;
    }
  }

  return { sendTransaction, executeTransactionRequest }
}

export function useTransactionWatcher (txnHash: string) {
  console.log(txnHash);
}