import { abi } from "../artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { useAssetPlaceholder } from "./useAssetPlaceholder";
import { decodeKeyValue } from '@erc725/erc725.js/build/main/src/lib/utils';

const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";

export function usePhygitalCollection(address?: string) {
  const phygital = useContract(
    address || import.meta.env.VITE_ASSET_CONTRACT,
    abi
  );
  const { placeholder } = useAssetPlaceholder();

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
    const metadataKey = `0x1339e76a390b7b9ec9010000${tokenId.collectionId.slice(2)}0000${tokenId.variantId.slice(2)}`;
    const dataValue = await phygital.getData(metadataKey);
    const { url } = decodeKeyValue('JSONURL', 'bytes', dataValue, 'metadata');
    const data = await fetch(url.replace('ipfs://', IPFS_GATEWAY)).then(res => res.json());

    return {
      ...data.LSP4Metadata,
      image: data.LSP4Metadata.images[0][0].url.replace('ipfs://', IPFS_GATEWAY),
      owner: owner,
    };
  }

  async function getMintStatus() {
    const [supply, [startAt, endAt, minted]] = await Promise.all([
      phygital.getFunction("tokenSupplyCap")(),
      placeholder.getFunction("collectionMeta")(phygital.target),
    ]);

    return {
      supply: Number(supply),
      minted: Number(minted),
      startAt: Number(startAt),
      endAt: Number(endAt),
    };
  }

  async function getCollectionMetadata() {
    return {
      name: "Honft",
      description: "Black Forest",
    };
  }

  return {
    phygital,
    getTokens,
    getMintStatus,
    getTokenMetadata,
    getCollectionMetadata,
  };
}
