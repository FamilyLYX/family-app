export type DiscountPass = {
    address: string,
    tokenId: string,
    discount: number,
    type: string,
    label: string
};

export function fetchPasses(): Promise<DiscountPass[]>{
    return new Promise((resolve) => {
        const passes = [
            { label:'honft', type: 'honft', tokenId: 'token1', address: 'address1', discount: 50 },
            { label:'giveaway', type: 'giveaway', tokenId: 'token3', address: 'address3', discount: 10 },
            { label:'genesis', type: 'genesis', tokenId: 'token5', address: 'address5', discount: 10 },
        ];
        resolve(passes);
    });
}
