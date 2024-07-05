import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      price
      picture
    }
  }
`;

export const PUBLISH_AD_MUTATION = gql`
  mutation PublishAd(
    $title: String!
    $description: String
    $price: Int
    $categoryId: Int
    $categoryName: String
  ) {
    publishAd(
      adData: {
        title: $title
        description: $description
        price: $price
        category: { id: $categoryId, name: $categoryName }
      }
    ) {
      id
      title
      description
      price
      picture
    }
  }
`;
