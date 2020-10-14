const { ApolloServer, gql } = require('apollo-server');

// Schema and types for data
const typeDefs = gql`
  type Book {
      id: ID!,
      title: String!,
      author: String,
      checkoutDate: String,
      returnDate: String
  }

  type ReturnBookResponse {
      ok: Boolean!
  }

  type Query {
      books: [Book]
  }

  type Mutation {
      checkoutBook(title: String!, author: String): Book
      returnBook(id: ID!): ReturnBookResponse
      updateReturnDate(id: ID!, returnDate: String): Book
  }
`;


// Implement operations - for example, store data on node server
const books = {};
let count = 1;
const checkoutBook = book => {
    const id = count++;
  
    let currentDate =  new Date();
    const checkoutDate = getCheckoutDateWithFormat(currentDate);    
    const returnDate = getReturnDateWithFormat(currentDate);

    return books[id] = { ...book, id, checkoutDate, returnDate}
}

const getCheckoutDateWithFormat = date => {
    return date.getFullYear() 
    + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getDate()).slice(-2);
}

const getReturnDateWithFormat = date => {
    date.setDate(date.getDate() + 30); // 30 day checkout period
    
    return date.getFullYear()
        + "-" + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-" + ("0" + date.getDate()).slice(-2);
}


const resolvers = {
  Query: {
    books: () => Object.values(books),
  },
  Mutation: {
    checkoutBook: async (parent, book) => {
        return checkoutBook(book);
    },
    returnBook: async (parent, {id}) => {
        const ok = Boolean(books[id]);
        delete books[id];

        return { ok };
    }, updateReturnDate: async (parent, {id, ...book}) => {
        if (!books[id]) {
            throw new Error("Book is not current checked out")
        }

        books[id] = {
            ...books[id],
            ...book,
        }

        return books[id];
    }
  },
};

// Seed initial data
checkoutBook({title: "Pride and Prejudice", author: "Jane Austen"})
checkoutBook({title: "Emma", author: "Jane Austen"})
checkoutBook({title: "Dragonsong", author: "Harper Hall"})

// Setup server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`); // eslint-disable-line no-console
});
