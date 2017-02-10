import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'
import { Author } from '../graphql';

@Injectable()
export class AuthorService {

  constructor(private apollo: Apollo) {}

  getAuthors(): Observable<Author[]> {
    return this.apollo.watchQuery<GetAuthorsQueryResult>({
      query: gql`
        {
          authors {
            id,
            name, 
            books { 
              id 
            }
          }
        }
      `
    })
      .switchMap(result => Observable.of(result.data.authors)) as any;
  }
}

export interface GetAuthorsQueryResult {
  authors: Author[];
}
