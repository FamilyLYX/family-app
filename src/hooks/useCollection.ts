import { abi } from "../artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";

export function usePhygitalCollection() {
  const phygital = useContract(import.meta.env.VITE_ASSET_CONTRACT, abi);

  async function getTokens(address: string) {
    if (!address) {
      return [];
    }

    const tokens = await phygital.getFunction("tokenIdsOf")(address);

    return Array.from(tokens).map((idStr) =>
      TokenId.parseTokenId(idStr as string)
    );
  }

  async function getTokenMetadata(tokenId: TokenId) {
    const owner = await phygital.getFunction("tokenOwnerOf")(
      tokenId.toString()
    );

    return {
      name: "Honft",
      description: "Black Forest",
      owner: owner,
    };
  }

  return { phygital, getTokens, getTokenMetadata };
}
