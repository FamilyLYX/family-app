import { abi } from "family-contracts/artifacts/contracts/AssetPlaceholder.sol/AssetPlaceholder.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { hexlify } from "ethers";
import { useTransactionSender } from "./transactions";

const REGISTER_FUNCTION_NAME = 'register(string uid, bytes signature, bytes32 _tokenId)';

export function useAssetPlaceholder() {
  const placeholder = useContract(import.meta.env.VITE_ASSET_PLACEHOLDER, abi);
  const { sendTransaction  } = useTransactionSender();

  async function getOrders (address: string) {
    if (!address) { return []; }
  
    const tokens = await placeholder.getFunction('tokenIdsOf')(address);
  
    return Array.from(tokens).map((idStr) => TokenId.parseTokenId(idStr as string));
  }

  async function registerToken (uid: string, signature: string, tokenId: TokenId) {
    return sendTransaction(placeholder, REGISTER_FUNCTION_NAME, [
      uid,
        hexlify(signature),
        hexlify(tokenId.toString())
    ]);
  }

  async function getTokenMetadata (tokenId: TokenId) {
    return {
      name: "Honft",
      description: "Black Forest",
      id: tokenId
    }
  }

  return { placeholder, getOrders, registerToken, getTokenMetadata };
}