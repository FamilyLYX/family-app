import { gql } from '@apollo/client';

export const FETCH_TRADE = gql`
  query fetchtrade($id: String!) {
    Trade_by_pk(id: $id) {
      acceptFiat
      buyer
      collection
      collectionType
      db_write_timestamp
      escrow
      id
      price
      seller
      status
      tokenId
      trackingId
      listingURL
    }
  }
`;

export const INDEX_TRADES = gql`
  query IndexListings($first: Int = 10, $skip: Int = 0, $address: String!) {
    Trade(
      where: {
        _or: [{ seller: { _eq: $address } }, { buyer: { _eq: $address } }]
      }
    ) {
      buyer
      seller
      escrow
      acceptFiat
      collection
      collectionType
      id
      listingURL
      price
      status
      tokenId
      trackingId
    }
  }
`;
