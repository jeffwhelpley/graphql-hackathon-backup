import gql from 'graphql-tag';

export const bookFragment = gql`
  fragment BookInfo on Book {
    id
    title
    description
    author {
      name
    }
  }
`;

export const authorFragment = gql`
  fragment AuthorInfo on Author {
    id
    name
    books { 
      id 
    }
  }
`;
