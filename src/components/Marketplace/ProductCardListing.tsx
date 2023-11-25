import React from "react";
import { decodeKeyValue } from "@erc725/erc725.js/build/main/src/lib/utils";
import { abi } from "../../artifacts/contracts/IdentifiablePhygitalAsset.sol/IdentifiablePhygitalAsset.json";
import { useContract } from "../../hooks/useContract";
import { IPFS_GATEWAY } from "../../constants";
import { TokenId } from "../../common/objects";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

interface ProductCardProps {
  data: {
    image: string; // Assuming image is a URL or a file path
    title: string;
    price: string;
    price_unit: string;
    tokenId: string;
    collection: string;
  };
}

const ProductCardListing: React.FC<ProductCardProps> = ({ data }) => {
  console.log(data.collection);
  const collection = useContract(
    data.collection ?? import.meta.env.VITE_ASSET_CONTRACT,
    abi
  );
  async function getTokenMetadata(tokenId: TokenId) {
    console.log("tokenId", tokenId);
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
  const {
    isLoading,
    data: response,
    error,
  } = useQuery({
    queryKey: [["token", TokenId.parseTokenId(data.tokenId)]],
    queryFn: () => getTokenMetadata(TokenId.parseTokenId(data.tokenId)),
  });

  console.log("response", response, error);

  return (
    <Link
      to={`${data.collection}/${data.tokenId}`}
      className="card block rounded-xl overflow-hidden "
    >
      {isLoading ? (
        <Skeleton
          height={"28rem"}
          className="w-full rounded-3xl overflow-hidden"
        />
      ) : (
        <img
          src={response.image}
          alt=""
          className="w-full rounded-3xl overflow-hidden h-[28rem] object-cover "
        />
      )}
      <div className="p-4 flex flex-col justify-center items-center">
        {isLoading ? (
          <Skeleton className="w-1/2 mx-auto" width={"50%"} height={"2rem"} />
        ) : (
          <h5 className="capitalize font-bold long-title text-xl">
            {`${response.drop} (${response.size})`}
          </h5>
        )}

        <p className="text-black font-semibold">
          {Number(data.price.toString()) / 10 ** 18}{" "}
          <span className="text-black/30 font-medium">{"LYX"}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCardListing;
