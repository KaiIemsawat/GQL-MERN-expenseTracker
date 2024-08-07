import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

/* 
export const SIGN_UP = gql`
  mutation SignUp($matchNameHere: SignUpInput!) {
    signUp(input <-- this match to the name in userTypeDef: $matchNameHere) {
      _id
      name
      username
    }
  }
`;
*/
