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
    { label:'genesis perk', address: '0x9131820e8EcDC7e514f9D98567741744363e51D3', discount: 100 },
    { label:'chillwhales', address: '0x86e817172b5c07f7036bf8aa46e2db9063743a83', discount: 25 },
    { label:'platties', address: '0x5021e9ed50d8c71e3d74c0de7964342aaa1a0f62', discount: 25 },
    { label:'universal page', address: '0x5599d0ae8576250db2b9a9975fd3db1f6399b4fd', discount: 25 }
];

export async function fetchPasses(address: string, collectionAddr: string): Promise<DiscountPass[]> {
    const orderExtension = new Contract(import.meta.env.VITE_ORDER_EXTENSION, OrderExtension, readerRpcProvider);

    const userPasses = await Promise.all(passes.map(async (pass) => {
        const contract = new Contract(pass.address, LSP8, readerRpcProvider);

        const balance = await contract.getFunction("balanceOf")(address);
        let tokenIds;

        try {
            tokenIds = Number(balance) > 0 ? await contract.getFunction("tokenIdsOf")(address) : [];
        } catch (err) {
            console.log(pass.address, err);

            tokenIds = []
        }

        const availableTokenIds = await Promise.all(tokenIds.map(async (tokenId: string) => {
            try {
                return {
                    used: await orderExtension.isPerkClaimed(pass.address, collectionAddr, tokenId),
                    tokenId
                }
            }
            catch (err) {
                console.log('error');
                console.log(err);

                return { used: true, tokenId }
            }
        }));

        return Object.assign({
            tokenIds: availableTokenIds.filter((token) => !token.used).map((t) => t.tokenId.toString())
        }, pass);
    }));

    return userPasses;
}
