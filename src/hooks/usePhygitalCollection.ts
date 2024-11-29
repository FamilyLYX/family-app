import { abi } from "../artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { useContract, useContractFactory } from "./useContract";
import { TokenId } from "../common/objects";
import { useAssetPlaceholder } from "./useAssetPlaceholder";
import { decodeKeyValue } from '@erc725/erc725.js/build/main/src/lib/utils';

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

export function usePhygitalRepo(collections: string[]) {
  const factory = useContractFactory(abi);

  async function fetchTokens(address: string) {
    if (!address) {
      console.log('wallet not connected');

      return;
    }

    const tokenIds = await Promise.all(collections
      .map((addr) => factory.attach(addr))
      .map((contract) => contract.getFunction("tokenIdsOf")(address)));

    return tokenIds
      .map((ids, idx) => ids.map((_id: any) => ({ address: collections[idx], id: TokenId.parseTokenId(_id) })))
      .flat();
  }

  return { fetchTokens };
}

export function usePhygitalCollection(address: string) {
  const phygital = useContract(
    address,
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
    const metadataKey = `0x1339e76a390b7b9ec9010000${tokenId.collectionId.slice(2)}0000${tokenId.variantId.slice(2)}`;
    const dataValue = await phygital.getData(metadataKey);

    const owner = await phygital.getFunction("tokenOwnerOf")(
      tokenId.toString()
    );

    const { url } = decodeKeyValue('VerifiableURI', 'bytes', dataValue, 'metadata');

   const data = await fetch(url.replace('ipfs://', IPFS_GATEWAY)).then(res => res.json());

    return {
      ...data.LSP4Metadata,
      image: data.LSP4Metadata.images[0][0].url.replace('ipfs://', IPFS_GATEWAY),
      owner: owner,
    };
  }

  async function getMintStatus() {
    const [capped, [startAt, endAt, minted, digital]] = await Promise.all([
      phygital.getFunction('supportsInterface')('0x52058d8a'),
      placeholder.getFunction("collectionMeta")(phygital.target),
    ]);

    const supply = capped ? await phygital.getFunction("tokenSupplyCap")() : 0;

    return {
      capped,
      supply: Number(supply),
      minted: Number(minted),
      startAt: Number(startAt),
      endAt: Number(endAt),
      digital
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
