import { Component, OnInit } from '@angular/core';
import { AuthorService, BookService } from './services';

@Component({
  selector: 'app-root',
  template: `
    <h1>Authors</h1>
    <ul>
      <li *ngFor="let author of authors | async">
        {{author.id}} - {{author.name}}
      </li>
    </ul>
    <h1>Books</h1>
    <ul>
      <li *ngFor="let book of books | async">
        {{book.title}} by {{book.author.name}}
      </li>
    </ul>
  `,
})
export class AppComponent implements OnInit {
  public authors: any;
  public books: any;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService
  ) {}

  public ngOnInit() {
    this.authors = this.authorService.getAuthors();
    this.books = this.bookService.getBooks();
  }
}
