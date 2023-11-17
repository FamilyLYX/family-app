import { abi } from "../artifacts/contracts/LSP8Marketplace.sol/LSP8Marketplace.json";
import { useContract } from "./useContract";
import { TokenId } from "../common/objects";
import { BrowserProvider, ethers, hexlify } from "ethers";
import { useTransactionSender } from "./transactions";
import { marketplaceContractAddress } from "../constants";
import { BigNumber } from "@ethersproject/bignumber";
import { usePhygitalCollection } from "./usePhygitalCollection";

const LIST_FUNCTION_NAME =
  "putDigitalLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, address[] memory LSP7Addresses, uint256[] memory LSP7Amounts, bool[3] memory allowedOffers, string memory listingURl, bool _acceptFiat)";

export function useMarketplace() {
  const marketplace = useContract(marketplaceContractAddress, abi);
  const { sendTransaction } = useTransactionSender();
  const { phygital } = usePhygitalCollection();
  const provider = new BrowserProvider(window.ethereum);
  async function listToken1(
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
    const contract = new ethers.Contract(
      marketplaceContractAddress,
      abi,
      await provider.getSigner()
    );

    return contract.putDigitalLSP8OnSale(
      LSP8Address,
      hexlify(tokenId.toString()),
      1,
      [],
      [],
      [false, false, false],
      listingURl,
      acceptFiat
    );
  }

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
      1,
      [],
      [],
      [false, false, false],
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

  return { marketplace, listToken, listToken1 };
}
