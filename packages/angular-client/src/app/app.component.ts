import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <h1>Authors</h1>
    <ul>
      <li *ngFor="let author of authors | async">
        {{author.id}} - {{author.name}}
      </li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  public authors: ApolloQueryObservable<GetAuthorsQueryResult>;

  constructor(private apollo: Apollo) {}

  public ngOnInit() {
    this.authors = this.apollo.watchQuery<GetAuthorsQueryResult>({
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
      .map(result => result.data.authors) as any;
  }
}

interface Book {
  id: string;
}

interface Author {
  id: string;
  name: string;
  books: Book[];
}

interface GetAuthorsQueryResult {
  authors: Author[];
}
