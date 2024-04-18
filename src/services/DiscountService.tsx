import { Contract } from "ethers";
import { abi as LSP8 } from '../artifacts/@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol/LSP8IdentifiableDigitalAsset.json'
import { abi as OrderExtension } from '../artifacts/contracts/OrderExtension.sol/OrderExtension.json';
import { readerRpcProvider } from "../hooks/useContract";

export type DiscountPass = {
    address: string,
    tokenIds: string[],
    discount: number,
    label: string
};

const passes = [
    { label:'honft pass', address: import.meta.env.VITE_HONFT_PASS_ADDRESS, discount: 50 },
    { label:'giveaway pass', address: import.meta.env.VITE_GIVEAWAY_PASS_ADDRESS, discount: 100 },
    { label:'genesis perk', address: import.meta.env.VITE_GENESIS_PERK_ADDRESS, discount: 100 },
];

export async function fetchPasses(address: string, collection: string): Promise<DiscountPass[]> {
    const orderExtension = new Contract(import.meta.env.VITE_ORDER_EXTENSION, OrderExtension, readerRpcProvider);

    const userPasses = await Promise.all(passes.map(async (pass) => {
        const contract = new Contract(pass.address, LSP8, readerRpcProvider);

        const balance = await contract.getFunction("balanceOf")(address);
        const tokenIds = Number(balance) > 0 ? await contract.getFunction("tokenIdsOf")(address) : [];

        const availableTokenIds = await Promise.all(tokenIds.map(async (tokenId: string) => {
            return {
                used: await orderExtension.isPerkClaimed(pass.address, import.meta.env.VITE_ASSET_PLACEHOLDER, tokenId),
                tokenId
            }
        }));

        return Object.assign({
            tokenIds: availableTokenIds.filter((token) => !token.used).map((t) => t.tokenId.toString())
        }, pass);
    }));

    return userPasses;
}
