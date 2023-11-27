import { gql } from "@apollo/client";

export const FETCH_TRADE = gql`
  query fetchtrade($id: ID!) {
    trade(id: $id) {
      collection
      collectionType
      buyer
      escrow
      id
      price
      listingURL
      seller
      status
      trackingId
      tokenId
      url
      acceptFiat
    }
  }
`;

export const INDEX_TRADES = gql`
  query IndexListings($first: Int = 10, $skip: Int = 0) {
    trades(first: $first, skip: $skip) {
      collection
      collectionType
      buyer
      escrow
      id
      price
      listingURL
      seller
      status
      trackingId
      tokenId
      url
      acceptFiat
    }
  }
`;
