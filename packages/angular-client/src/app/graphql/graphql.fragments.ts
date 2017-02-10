import gql from 'graphql-tag';



export const authorFragment = gql`
  fragment AuthorInfo on Author {
    id
    name
    books { 
      id 
    }
  }
`;
