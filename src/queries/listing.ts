import { gql } from "@apollo/client";

export const FETCH_LISTING = gql`
  query fetchListing($id: ID!) {
    listing(id: id) {
      id
      images
      location
      price
      title
      tokenId
      url
      variant
      description
      collection
    }
  }
`;

export const INDEX_LISTINGS = gql`
  query IndexListings($first: Int = 10, $skip: Int = 0) {
    listings(first: $first, skip: $skip) {
      description
      collection
      id
      images
      location
      price
      title
      tokenId
      url
      variant
    }
  }
`;
