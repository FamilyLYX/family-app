import { Contract } from "ethers";
import { abi as LSP8 } from '../artifacts/@lukso/lsp8-contracts/contracts/LSP8IdentifiableDigitalAsset.sol/LSP8IdentifiableDigitalAsset.json'
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

export async function fetchPasses(address: string): Promise<DiscountPass[]> {
    const userPasses = await Promise.all(passes.map(async (pass) => {
        const contract = new Contract(pass.address, LSP8, readerRpcProvider);

        const balance = await contract.getFunction("balanceOf")(address);
        const tokenIds = Number(balance) > 0 ? await contract.getFunction("tokenIdsOf")(address) : [];

        return Object.assign({ tokenIds: tokenIds.map((id: string) => id.toString()) }, pass);
    }));

    return userPasses;
}
