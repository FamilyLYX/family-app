import { abi } from '../artifacts/marketplace/contracts/LSP8Marketplace.sol/LSP8Marketplace.json';
import { useContract } from './useContract';
import { TokenId } from '../common/objects';
import { hexlify, parseEther } from 'ethers6';
import { useTransactionSender } from './transactions';
import { marketplaceContractAddress } from '../constants';
import { usePhygitalCollection } from './usePhygitalCollection';
import { useStorage } from '@thirdweb-dev/react';

const LIST_FUNCTION_NAME =
  'putDigitalLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory listingURl, bool _acceptFiat)';

const LIST_PHYGITAL_FUNCTION_NAME =
  'putLSP8OnSale(address LSP8Address, bytes32 tokenId, uint256 LYXAmount, string memory uid, bytes memory signature, string memory listingURl, bool _acceptFiat)';
export function useMarketplace(address: string) {
  const marketplace = useContract(marketplaceContractAddress, abi);
  const storage = useStorage();

  const { sendTransaction, executeTransactionRequest } = useTransactionSender();
  const { phygital } = usePhygitalCollection(address);

  async function authorize(tokenId: TokenId) {
    return await sendTransaction(
      phygital,
      'authorizeOperator(address operator, bytes32 tokenId, bytes memory operatorNotificationData)',
      [marketplaceContractAddress, hexlify(tokenId.toString()), '0x']
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
    const tokens = await phygital.getFunction('tokenOwnerOf')(
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
    const tokens = await phygital.getFunction('tokenOwnerOf')(
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

  const uploadToIPFS = async (data: any) => {
    const res = await storage!.upload({ ...data });

    console.log(res);
    return res[0];
  };

  async function buyWithLYX(
    LSP8Address: string,
    tokenId: TokenId,
    data: Record<any, any>,
    price: number
  ) {
    const operator = await phygital.getFunction('isOperatorFor')(
      marketplaceContractAddress,
      hexlify(tokenId.toString())
    );

    const operators = await phygital.getFunction('getOperatorsOf')(
      hexlify(tokenId.toString())
    );
    console.log('operator', operator, tokenId.toString(), LSP8Address);
    console.log('getOperatorsOf', operators);
    // const tradeUrl = await uploadToIPFS(data);
    const calldata = marketplace.interface.encodeFunctionData(
      'buyLSP8WithLYX',
      [LSP8Address, tokenId.toString()]
    );

    return executeTransactionRequest({
      to: marketplace.target,
      data: calldata,
      value: price,
    });
  }

  async function confirmSent(tradeId: string, trackingId: string) {
    console.log([tradeId, trackingId]);
    return sendTransaction(
      marketplace,
      'confirmSent(bytes32 tradeId, string memory trackingId)',
      [tradeId, trackingId]
    );
  }

  return {
    marketplace,
    listToken,
    authorize,
    listPhygital,
    buyWithLYX,
    confirmSent,
  };
}
