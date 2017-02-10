import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'
import { Book, bookFragment } from '../graphql';

@Injectable()
export class BookService {

  constructor(private apollo: Apollo) {}

  getBooks(): Observable<Book[]> {
    return this.apollo.watchQuery<GetBooksQueryResult>({
      query: gql`
        {
          books {
            ...BookInfo
          }
        }
        ${bookFragment}
      `
    })
      .switchMap(result => Observable.of(result.data.books));
  }

  // TODO: need to specify the right GraphQL queries/mutations below

  getBookById(id: string): Observable<Book> {
    return this.apollo.query<GetBookQueryResult>({
      query: gql`
        query getBookById($id: String!) {
          getBookById(id: $id) {
            ...BookInfo
          }
        }
        ${bookFragment}
      `,
      variables: {
        id
      }
    })
      .switchMap(result => Observable.of(result.data.book))
  }

  bookSearch(keyword): Observable<Book[]> {
    return this.apollo.query<GetBooksQueryResult>({
      query: gql`
        query bookSearch($keyword: String!) {
          bookSearch(keyword: $keyword) {
            ...BookInfo
          }
        }
        ${bookFragment}
      `,
      variables: {
        keyword
      }
    })
      .switchMap(result => Observable.of(result.data.books));
  }

  addBook(book: Book): Observable<Book> {
    return this.apollo.mutate<GetBookQueryResult>({
      mutation: gql`
        mutation addBook($book: BookInput!) {
          addBook(book: $book) {
            ...BookInfo
          }
        }
        ${bookFragment}
      `,
      variables: {
        book
      }
    })
      .switchMap(result => Observable.of(result.data.book));
  }
}

export interface GetBooksQueryResult {
  books: Book[];
}

export interface GetBookQueryResult {
  book: Book;
}
