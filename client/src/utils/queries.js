import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    book {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`


export LOGIN_USER = gql`
  query loginUser {
    user {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`

// export ADD_USER = gql`



// `
// export SAVE_BOOK = gql`



// `
// export REMOVE_BOOK = gql`



// `
