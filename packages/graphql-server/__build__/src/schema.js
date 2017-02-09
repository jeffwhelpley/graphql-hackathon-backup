"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var graphql_1 = require("graphql");
var db_1 = require("./db");
var types_1 = require("./types");
var rootFields = {
    authors: {
        type: new graphql_1.GraphQLList(types_1.authorType),
        resolve: function () {
            return db_1.authors;
        }
    },
    books: {
        type: new graphql_1.GraphQLList(types_1.bookType),
        resolve: function () {
            // Resolve functions can return promises
            return Promise.resolve(db_1.books);
        }
    },
    bookByID: {
        type: types_1.bookType,
        args: {
            id: {
                type: graphql_1.GraphQLString,
            }
        },
        resolve: function (object, _a) {
            var id = _a.id;
            return db_1.books.find(function (book) { return "book-" + book.id === id; });
        }
    },
    bookSearch: {
        type: new graphql_1.GraphQLList(types_1.bookType),
        args: {
            keyword: {
                type: graphql_1.GraphQLString,
            }
        },
        resolve: function (object, _a) {
            var keyword = _a.keyword;
            return db_1.books.filter(function (book) { return book.title.includes(keyword); });
        }
    },
    secret: {
        type: graphql_1.GraphQLString,
        resolve: function (object, args, context, _a) {
            var rootValue = _a.rootValue;
            var user = rootValue.user;
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
var Viewer = new graphql_1.GraphQLObjectType({
    name: 'Viewer',
    fields: rootFields,
});
exports.schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'QueryRoot',
        fields: __assign({ viewer: {
                type: Viewer,
                resolve: function () { return ({}); },
            } }, rootFields)
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: 'MutationRoot',
        fields: {
            addBook: {
                type: types_1.bookType,
                args: {
                    book: {
                        type: types_1.bookInputType,
                    }
                },
                resolve: function (object, _a) {
                    var book = _a.book;
                    db_1.books.push(book);
                    return book;
                }
            }
        }
    }),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZWZmd2hlbHBsZXkvb3BlbnNvdXJjZS9ncmFwaHFsLWhhY2thdGhvbi9wYWNrYWdlcy9ncmFwaHFsLXNlcnZlci8iLCJzb3VyY2VzIjpbInNyYy9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBS2lCO0FBQ2pCLDJCQUFzQztBQUN0QyxpQ0FBOEQ7QUFFOUQsSUFBTSxVQUFVLEdBQUc7SUFDZixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsSUFBSSxxQkFBVyxDQUFDLGtCQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFO1lBQ0wsTUFBTSxDQUFDLFlBQU8sQ0FBQztRQUNuQixDQUFDO0tBQ0o7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSSxxQkFBVyxDQUFDLGdCQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFO1lBQ0wsd0NBQXdDO1lBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FDSjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxnQkFBUTtRQUNkLElBQUksRUFBRTtZQUNGLEVBQUUsRUFBRTtnQkFDQSxJQUFJLEVBQUUsdUJBQWE7YUFDdEI7U0FDSjtRQUNELE9BQU8sRUFBRSxVQUFDLE1BQVcsRUFBRSxFQUFTO2dCQUFSLFVBQUU7WUFDdEIsTUFBTSxDQUFDLFVBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxVQUFRLElBQUksQ0FBQyxFQUFJLEtBQUssRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDeEQsQ0FBQztLQUNKO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLElBQUkscUJBQVcsQ0FBQyxnQkFBUSxDQUFDO1FBQy9CLElBQUksRUFBRTtZQUNGLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsdUJBQWE7YUFDdEI7U0FDSjtRQUNELE9BQU8sRUFBRSxVQUFDLE1BQVcsRUFBRSxFQUFjO2dCQUFiLG9CQUFPO1lBQzNCLE1BQU0sQ0FBQyxVQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUM5RCxDQUFDO0tBQ0o7SUFDRCxNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsdUJBQWE7UUFDbkIsT0FBTyxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQVMsRUFBRSxPQUFZLEVBQUUsRUFBZ0I7Z0JBQWYsd0JBQVM7WUFDdEQsSUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsTUFBTSxDQUFDLDJDQUEyQyxDQUFDO1lBQ3ZELENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDekIsQ0FBQztZQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDMUIsQ0FBQztLQUNKO0NBQ0osQ0FBQztBQUVGLDREQUE0RDtBQUM1RCxJQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFpQixDQUFDO0lBQ2pDLElBQUksRUFBRSxRQUFRO0lBQ2QsTUFBTSxFQUFFLFVBQVU7Q0FDckIsQ0FBQyxDQUFDO0FBRVUsUUFBQSxNQUFNLEdBQUcsSUFBSSx1QkFBYSxDQUFDO0lBQ3BDLEtBQUssRUFBRSxJQUFJLDJCQUFpQixDQUFDO1FBQ3pCLElBQUksRUFBRSxXQUFXO1FBQ2pCLE1BQU0sYUFDRixNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLGNBQU0sT0FBQSxDQUFDLEVBQUUsQ0FBQyxFQUFKLENBQUk7YUFDdEIsSUFDRSxVQUFVLENBQ2hCO0tBQ0osQ0FBQztJQUNGLFFBQVEsRUFBRSxJQUFJLDJCQUFpQixDQUFDO1FBQzVCLElBQUksRUFBRSxjQUFjO1FBQ3BCLE1BQU0sRUFBRTtZQUNKLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsZ0JBQVE7Z0JBQ2QsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRTt3QkFDRixJQUFJLEVBQUUscUJBQWE7cUJBQ3RCO2lCQUNKO2dCQUNELE9BQU8sRUFBRSxVQUFDLE1BQU0sRUFBRSxFQUFNO3dCQUFMLGNBQUk7b0JBQ25CLFVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtTQUNKO0tBQ0osQ0FBQztDQUNMLENBQUMsQ0FBQyJ9