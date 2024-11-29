import { abi } from "../artifacts/contracts/AssetPlaceholder.sol/AssetPlaceholder.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { Contract, hexlify } from "ethers";
import { useTransactionSender } from "./transactions";
import { useVaultFactory } from "./useVault";

const REGISTER_FUNCTION_NAME =
  "register(string uid, bytes signature, bytes32 _tokenId)";

export function useAssetPlaceholder() {
  const placeholder = useContract(import.meta.env.VITE_ASSET_PLACEHOLDER, abi);
  const { sendTransaction } = useTransactionSender();
  const vaultFactory = useVaultFactory();

  async function getOrders(address: string) {
    if (!address) {
      return [];
    }

    const tokens = await placeholder.getFunction("tokenIdsOf")(address);

    return Array.from(tokens).map((idStr) =>
      TokenId.parseTokenId(idStr as string)
    );
  }

  async function registerToken(
    uid: string,
    signature: string,
    tokenId: TokenId,
    vault?: string
  ) {
    const registerParams = [
      uid,
      hexlify(signature),
      hexlify(tokenId.toString()),
    ];

    if (vault) {
      const vaultContract = vaultFactory.attach(vault);

      const calldata = placeholder.interface.encodeFunctionData(REGISTER_FUNCTION_NAME, registerParams);

      return sendTransaction(vaultContract as Contract, 'execute', [0, placeholder.target, 0, calldata]);
    }

    return sendTransaction(placeholder, REGISTER_FUNCTION_NAME, registerParams);
  }

  async function getTokenMetadata(tokenId: TokenId) {
    return {
      name: "Honft",
      description: "Black Forest",
      id: tokenId,
    };
  }

  return { placeholder, getOrders, registerToken, getTokenMetadata };
}
