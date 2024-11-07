import { gql } from '@apollo/client';

export const FETCH_LISTING = gql`
  query fetchListing($id: String!) {
    Listing_by_pk(id: $id) {
      acceptFiat
      collection
      collectionType
      db_write_timestamp
      id
      price
      tokenId
      url
    }
  }
`;

export const INDEX_LISTINGS = gql`
  query IndexListings($first: Int = 10, $skip: Int = 0) {
    Listing {
      acceptFiat
      collection
      collectionType
      id
      price
      tokenId
      url
    }
  }
`;
