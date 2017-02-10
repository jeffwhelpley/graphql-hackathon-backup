import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'
import { Book } from '../graphql';

@Injectable()
export class BookService {

  constructor(private apollo: Apollo) {}

  getBooks(): Observable<Book[]> {
    return this.apollo.watchQuery<GetBooksQueryResult>({
      query: gql`
        {
          books {
            id,
            title, 
            description,
            author {
              name
            }
          }
        }
      `
    })
      .switchMap(result => Observable.of(result.data.books));
  }

  // TODO: need to specify the right GraphQL queries/mutations below

  getBookById(id: string): Observable<Book> {
    return this.apollo.query<GetBookQueryResult>({
      query: gql`
      
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
