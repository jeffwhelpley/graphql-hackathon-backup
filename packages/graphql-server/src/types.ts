import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
} from 'graphql';
import { authors, books } from './db';

export const authorType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Author',
    description: 'The creator of books',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (author) => `author-${author.id}`,
        },
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        books: {
            type: new GraphQLList(bookType),
            resolve: (author) => {
                const authorsBooks = books.filter(
                    book => book.authorId === author.id
                );
                return authorsBooks;
            }
        }
    }),
});

export const bookType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    description: 'Words on a page, tells a story.',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (book) => `book-${book.id}`,
        },
        title: {type: GraphQLString},
        image: {type: GraphQLString},
        authorId: {type: GraphQLString},
        description: {type: GraphQLString},
        author: {
            type: authorType,
            resolve: (book) => {
                return authors[book.authorId];
            }
        }
    }),
});

export const bookInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
    name: 'BookInput',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        image: {type: GraphQLString},
        description: {type: GraphQLString},
        authorId: {type: GraphQLString},
    }),
});
