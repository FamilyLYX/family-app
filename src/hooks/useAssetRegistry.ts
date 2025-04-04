import { abi } from "../artifacts/contracts/AssetRegistry.sol/AssetRegistry.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { hexlify, keccak256, toUtf8Bytes, zeroPadValue } from "ethers";

export function useAssetRegistry() {
  const registry = useContract(import.meta.env.VITE_ASSET_REGISTRY, abi);

  async function getCollection(uid: string) {
    const identifier = keccak256(toUtf8Bytes(uid));
    console.log(
      "registry",
      import.meta.env.VITE_ASSET_REGISTRY,
      identifier,
      registry
    );

    // const [collection, tokenId] = await registry.checkIdentifier(identifier);

    return {
      collection: "0x7cdbcd982546863f3647d3c0203928c3c8d3b99d",
      registered: false,
      // reg÷istered: tokenId !== zeroPadValue(hexlify("0x"), 32).toString(),
      tokenId: TokenId.parseTokenId(zeroPadValue(hexlify("0x"), 32)),
    };
  }

  return { registry, getCollection };
}
