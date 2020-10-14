# Sample Library Application

## About
Sample application that uses GraphQL to create, read update, and delete from a list of JSON data stored on the NodeJS server.

This is a simple library application, that allows one user to control the list of what is checked out from the library. A user is able to see the current list of checked out books, update the return dates, return a book, and checkout new books.

Technology: Apollo NodeJS and GraphQL

## Running the Application
- Download code
- Run `npm install` to install dependencies
- Run `npm start` to start server locally
- Go to `localhost:4000` to see the UI
- Write a query, either using one of the ones listed below or your own


## GraphQL Queries
### Get list of books currently checked out
~~~json
query GetCheckedOutBooks {
  books {
    id
    title
    author
    checkoutDate
    returnDate
  }
}
~~~

### Checkout a new book
~~~json
mutation CheckoutBook {
  checkoutBook(title:"Eight Cousins", author: "Louisa May Alcott") {
    id
    author
  }
}
~~~

### Return a book and remove it from the checked out list
~~~json
mutation ReturnBook {
  returnBook(id: 1) {
    ok
  }
}
~~~

### Update the return date on a currently checked out book
~~~json
mutation UpdateReturnDate {
  updateReturnDate(id: 2, returnDate: "2021-01-01") {
    id
    title
    author
    checkoutDate
    returnDate
  }
}
~~~