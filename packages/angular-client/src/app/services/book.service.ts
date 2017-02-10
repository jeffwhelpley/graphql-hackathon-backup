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
      .switchMap(result => Observable.of(result.data.books)) as any;
  }
}

export interface GetBooksQueryResult {
  books: Book[];
}
