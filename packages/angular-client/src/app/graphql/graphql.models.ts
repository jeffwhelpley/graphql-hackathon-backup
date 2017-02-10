
export interface Author {
  id: string;
  name: string;
  image: string;
  books: Book[];
}

export interface Book {
  id: string;
  title: string;
  image: string;
  authorId: string;
  description: string;
  author: Author;
}
