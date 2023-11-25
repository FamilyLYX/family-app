import { abi } from "../artifacts/contracts/LSP8Marketplace.sol/LSP8Marketplace.json";
import { abi as multicallAbi } from "../artifacts/contracts/multicall/multicall.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { BrowserProvider, ethers, hexlify, parseEther } from "ethers";
import { useTransactionSender } from "./transactions";
import { marketplaceContractAddress, multicallContract } from "../constants";
import { usePhygitalCollection } from "./usePhygitalCollection";

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

    // await sendTransaction(
    //   marketplace,
    //   "removeLSP8FromSale(address LSP8Address, bytes32 tokenId)",
    //   [LSP8Address, hexlify(tokenId.toString())]
    // );

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
  async function removeFromSale(LSP8Address: string, tokenId: TokenId) {
    return sendTransaction(
      marketplace,
      "removeLSP8FromSale(address LSP8Address, bytes32 tokenId)",
      [LSP8Address, hexlify(tokenId.toString())]
    );
  }

  return { marketplace, listToken, authorize, listPhygital, removeFromSale };
}
