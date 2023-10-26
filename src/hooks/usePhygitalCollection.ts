import { abi } from "family-contracts/artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { useAssetPlaceholder } from "./useAssetPlaceholder";

export function usePhygitalCollection (address?: string) {
  const phygital = useContract(address || import.meta.env.VITE_ASSET_CONTRACT, abi);
  const { placeholder } = useAssetPlaceholder();

  async function getTokens (address: string) {
    if (!address) { return []; }
  
    const tokens = await phygital.getFunction('tokenIdsOf')(address);
  
    return Array.from(tokens).map((idStr) => TokenId.parseTokenId(idStr as string));
  }

  async function getTokenMetadata (tokenId: TokenId) {
    const owner = await phygital.getFunction('tokenOwnerOf')(tokenId.toString());

    return {
      name: "Honft",
      description: "Black Forest",
      owner: owner
    }
  }

  async function getMintStatus () {
    const [supply, [startAt, endAt, minted]] = await Promise.all([
      phygital.getFunction('tokenSupplyCap')(),
      placeholder.getFunction('collectionMeta')(phygital.target)
    ]);

    return {
      supply: Number(supply),
      minted: Number(minted),
      startAt: Number(startAt),
      endAt: Number(endAt),
    };
  }

  async function getCollectionMetadata () {
    return {
      name: "Honft",
      description: "Black Forest"
    }
  }

  return { phygital, getTokens, getMintStatus, getTokenMetadata, getCollectionMetadata };
}