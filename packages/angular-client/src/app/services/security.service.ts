import { Injectable } from '@angular/core';
// import { Apollo, ApolloQueryObservable } from 'apollo-angular';
// import gql from 'graphql-tag';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'

@Injectable()
export class SecurityService {

  // constructor(private apollo: Apollo) {}

  login(): Observable<boolean> {
    return Observable.of(true);
  }
}

