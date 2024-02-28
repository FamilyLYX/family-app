import { abi } from "../artifacts/contracts/LSP8Marketplace.sol/LSP8Marketplace.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { hexlify, parseEther } from "ethers";
import { useTransactionSender } from "./transactions";
import { marketplaceContractAddress } from "../constants";
import { usePhygitalCollection } from "./usePhygitalCollection";

const LIST_FUNCTION_NAME =
  "putDigitalLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory listingURl, bool _acceptFiat)";

const LIST_PHYGITAL_FUNCTION_NAME =
  "putLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory uid, bytes memory signature, string memory listingURl, bool _acceptFiat)";
export function useMarketplace(address: string) {
  const marketplace = useContract(marketplaceContractAddress, abi);

  const { sendTransaction } = useTransactionSender();
  const { phygital } = usePhygitalCollection(address);

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

  return { marketplace, listToken, authorize, listPhygital };
}
