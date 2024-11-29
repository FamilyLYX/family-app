import { Contract } from 'ethers';
import { abi as LSP8 } from '../artifacts/@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol/LSP8IdentifiableDigitalAsset.json';
import { abi as OrderExtension } from '../artifacts/contracts/OrderExtension.sol/OrderExtension.json';
import { readerRpcProvider } from '../hooks/useContract';

export type DiscountPass = {
  address: string;
  tokenIds: string[];
  discount: number;
  label: string;
};

const passes = [
  //   {
  //     label: 'honft pass',
  //     address: import.meta.env.VITE_HONFT_PASS_ADDRESS,
  //     discount: 50,
  //   },
  {
    label: 'Platties',
    address: '0x5021e9ed50d8c71e3d74c0de7964342aaa1a0f62',
    discount: 25,
  },
  {
    label: 'Chillwhales',
    address: '0x86e817172b5c07f7036bf8aa46e2db9063743a83',
    discount: 25,
  },
  {
    label: 'Universal Page',
    address: '0x5599d0ae8576250db2b9a9975fd3db1f6399b4fd',
    discount: 25,
  },
  {
    label: 'giveaway pass',
    address: import.meta.env.VITE_GIVEAWAY_PASS_ADDRESS,
    discount: 100,
  },
  {
    label: 'genesis perk',
    address: import.meta.env.VITE_GENESIS_PERK_ADDRESS,
    discount: 100,
  },
];

export async function fetchPasses(address: string): Promise<DiscountPass[]> {
  const orderExtension = new Contract(
    import.meta.env.VITE_ORDER_EXTENSION,
    OrderExtension,
    readerRpcProvider
  );

  const userPasses = await Promise.all(
    passes.map(async (pass) => {
      const contract = new Contract(pass.address, LSP8, readerRpcProvider);

      const balance = await contract.getFunction('balanceOf')(address);
      const tokenIds =
        Number(balance) > 0
          ? await contract.getFunction('tokenIdsOf')(address)
          : [];

      const availableTokenIds = await Promise.all(
        tokenIds.map(async (tokenId: string) => {
          return {
            used: await orderExtension.isPerkClaimed(pass.address, tokenId),
            tokenId,
          };
        })
      );

      return Object.assign(
        {
          tokenIds: availableTokenIds
            .filter((token) => !token.used)
            .map((t) => t.tokenId.toString()),
        },
        pass
      );
    })
  );

  return userPasses.filter((passes) => passes.tokenIds.length > 0);
}
