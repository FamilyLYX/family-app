import { abi } from "../artifacts/contracts/LSP8Marketplace.sol/LSP8Marketplace.json";
import { abi as multicallAbi } from "../artifacts/contracts/multicall/multicall.json";
import { abi as NFTABI } from "../artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { decodeKeyValue } from "@erc725/erc725.js/build/main/src/lib/utils";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { BrowserProvider, ethers, hexlify, parseEther } from "ethers";
import { useTransactionSender } from "./transactions";
import {
  IPFS_GATEWAY,
  marketplaceContractAddress,
  multicallContract,
} from "../constants";
import { usePhygitalCollection } from "./usePhygitalCollection";
import { LSP4DigitalAssetMetadata } from "@lukso/lsp-factory.js";

const LIST_FUNCTION_NAME =
  "putDigitalLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory listingURl, bool _acceptFiat)";

const LIST_PHYGITAL_FUNCTION_NAME =
  "putLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory uid, bytes memory signature, string memory listingURl, bool _acceptFiat)";
const AGGREGATE_FUNCTION_NAME = "aggregate";
export function useMarketplace() {
  const marketplace = useContract(marketplaceContractAddress, abi);
  const multicall = useContract(multicallContract, multicallAbi);

  const { sendTransaction, executeTransactionRequest } = useTransactionSender();
  const { phygital } = usePhygitalCollection(
    import.meta.env.VITE_ASSET_CONTRACT
  );
  const provider = new BrowserProvider(window.ethereum);

  async function authorize(tokenId: TokenId) {
    return await sendTransaction(
      phygital,
      "authorizeOperator(address operator, bytes32 tokenId, bytes memory operatorNotificationData)",
      [marketplaceContractAddress, hexlify(tokenId.toString()), "0x"]
    );
  }
  // string memory uid,
  // bytes memory signature,
  async function listToken(
    LSP8Address: string,
    tokenId: TokenId,
    price: number,
    listingURl: string,
    acceptFiat: boolean
  ) {
    const tokens = await phygital.getFunction("tokenOwnerOf")(
      hexlify(tokenId.toString())
    );
    console.log(tokens);

    return sendTransaction(marketplace, LIST_FUNCTION_NAME, [
      LSP8Address,
      hexlify(tokenId.toString()),
      parseEther(price.toString()),
      listingURl,
      acceptFiat,
    ]);

    // return marketplace.putDigitalLSP8OnSale(
    //   LSP8Address,
    //   hexlify(tokenId.toString()),
    //   1,
    //   [],
    //   [],
    //   [false, false, false],
    //   listingURl,
    //   acceptFiat
    // );
  }

  async function useTokenMetadata(address: string, tokenId: TokenId) {
    const collection = useContract(address, NFTABI);
    const owner = await collection.getFunction("tokenOwnerOf")(
      tokenId.toString()
    );
    const metadataKey = `0x1339e76a390b7b9ec9010000${tokenId.collectionId.slice(
      2
    )}0000${tokenId.variantId.slice(2)}`;
    const dataValue = await collection.getData(metadataKey);
    const { url } = decodeKeyValue("JSONURL", "bytes", dataValue, "metadata");
    const data = await fetch(url.replace("ipfs://", IPFS_GATEWAY)).then((res) =>
      res.json()
    );

    return {
      ...data.LSP4Metadata,
      image: data.LSP4Metadata.images[0][0].url.replace(
        "ipfs://",
        IPFS_GATEWAY
      ),
      owner: owner,
    };
  }

  async function listPhygital(
    LSP8Address: string,
    tokenId: TokenId,
    price: number,
    listingURl: string,
    acceptFiat: boolean,
    uid: string,
    signature: string
  ) {
    const tokens = await phygital.getFunction("tokenOwnerOf")(
      hexlify(tokenId.toString())
    );
    console.log(tokens);
    return sendTransaction(marketplace, LIST_PHYGITAL_FUNCTION_NAME, [
      LSP8Address,
      hexlify(tokenId.toString()),
      parseEther(price.toString()),
      uid,
      signature,
      listingURl,
      acceptFiat,
    ]);
  }
  // confirmSent(bytes32 tradeId, string memory trackingId)
  async function confirmSent(tradeId: string, trackingId: string) {
    return sendTransaction(
      marketplace,
      "confirmSent(bytes32 tradeId, string memory trackingId)",
      [tradeId, trackingId]
    );
  }

  async function removeFromSale(LSP8Address: string, tokenId: TokenId) {
    return sendTransaction(
      marketplace,
      "removeLSP8FromSale(address LSP8Address, bytes32 tokenId)",
      [LSP8Address, hexlify(tokenId.toString())]
    );
  }

  const uploadToIPFS = async (data: Record<any, any>) => {
    const res = await LSP4DigitalAssetMetadata.uploadMetadata(data as any);
    return res.url.replace("ipfs://", IPFS_GATEWAY);
  };

  async function buyWithLYX(
    LSP8Address: string,
    tokenId: TokenId,
    data: Record<any, any>,
    price: number
  ) {
    const tradeUrl = await uploadToIPFS(data);
    const calldata = marketplace.interface.encodeFunctionData(
      "buyLSP8WithLYX",
      [LSP8Address, hexlify(tokenId.toString()), tradeUrl]
    );

    return executeTransactionRequest({
      to: marketplace.target,
      data: calldata,
      value: price,
    });
  }

  return {
    useTokenMetadata,
    marketplace,
    listToken,
    authorize,
    listPhygital,
    removeFromSale,
    buyWithLYX,
    confirmSent,
  };
}
