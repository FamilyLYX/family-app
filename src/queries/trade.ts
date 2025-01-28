import { gql } from "@apollo/client";

export const INDEX_USER_TRADES = gql`
  query IndexListings($user: String) {
    Trade(
      where: { _or: [{ buyer: { _eq: $user } }, { seller: { _eq: $user } }] }
    ) {
      buyer
      collection
      acceptFiat
      collectionType
      escrow
      id
      listingURL
      price
      seller
      status
      tokenId
      trackingId
    }
  }
`;
