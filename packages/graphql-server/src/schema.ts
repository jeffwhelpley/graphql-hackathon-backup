import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} from 'graphql';
import { authors, books } from './db';
import { authorType, bookType, bookInputType } from './types';

const rootFields = {
    authors: {
        type: new GraphQLList(authorType),
        resolve: () => {
            return authors;
        }
    },
    books: {
        type: new GraphQLList(bookType),
        resolve: () => {
            // Resolve functions can return promises
            return Promise.resolve(books);
        }
    },
    bookByID: {
        type: bookType,
        args: {
            id: {
                type: GraphQLString,
            }
        },
        resolve: (object: any, {id}: any) => {
            return books.find(book => `book-${book.id}` === id);
        }
    },
    bookSearch: {
        type: new GraphQLList(bookType),
        args: {
            keyword: {
                type: GraphQLString,
            }
        },
        resolve: (object: any, {keyword}: any) => {
            return books.filter(book => book.title.includes(keyword));
        }
    },
    secret: {
        type: GraphQLString,
        resolve: (object: any, args: any, context: any, {rootValue}: any) => {
            const user = rootValue.user;
            if (!user) {
                return 'only authorized users can know the secret';
            }
            if (user.name === 'admin' && user.pass === '123') {
                return 'howdy admin';
            }
            return 'who are you?';
        }
    }
};

// Single "viewer" object for Relay root query compatibility
const Viewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: rootFields,
});

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryRoot',
        fields: {
            viewer: {
                type: Viewer,
                resolve: () => ({}),
            },
            ...rootFields,
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'MutationRoot',
        fields: {
            addBook: {
                type: bookType,
                args: {
                    book: {
                        type: bookInputType,
                    }
                },
                resolve: (object, {book}) => {
                    books.push(book);
                    return book;
                }
            }
        }
    }),
});
