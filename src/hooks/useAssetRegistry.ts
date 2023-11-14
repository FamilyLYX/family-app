import { abi } from "../artifacts/contracts/AssetRegistry.sol/AssetRegistry.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { hexlify, keccak256, toUtf8Bytes, zeroPadValue } from "ethers";

export function useAssetRegistry() {
  const registry = useContract(import.meta.env.VITE_ASSET_REGISTRY, abi);

  async function getCollection(uid: string) {
    const identifier = keccak256(toUtf8Bytes(uid));

    const [collection, tokenId] = await registry.getFunction("checkIdentifier")(
      identifier
    );

    return {
      collection,
      registered: tokenId !== zeroPadValue(hexlify("0x"), 32).toString(),
      tokenId: TokenId.parseTokenId(tokenId),
    };
  }

  return { registry, getCollection };
}
