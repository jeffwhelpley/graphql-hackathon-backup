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
            var foo = db_1.books;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qZWZmd2hlbHBsZXkvb3BlbnNvdXJjZS9ncmFwaHFsLWhhY2thdGhvbi9wYWNrYWdlcy9ncmFwaHFsLXNlcnZlci8iLCJzb3VyY2VzIjpbInNyYy9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBS2lCO0FBQ2pCLDJCQUFzQztBQUN0QyxpQ0FBOEQ7QUFFOUQsSUFBTSxVQUFVLEdBQUc7SUFDZixPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsSUFBSSxxQkFBVyxDQUFDLGtCQUFVLENBQUM7UUFDakMsT0FBTyxFQUFFO1lBQ0wsTUFBTSxDQUFDLFlBQU8sQ0FBQztRQUNuQixDQUFDO0tBQ0o7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSSxxQkFBVyxDQUFDLGdCQUFRLENBQUM7UUFDL0IsT0FBTyxFQUFFO1lBQ0wsSUFBSSxHQUFHLEdBQUcsVUFBSyxDQUFDO1lBRWhCLHdDQUF3QztZQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQ0o7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsZ0JBQVE7UUFDZCxJQUFJLEVBQUU7WUFDRixFQUFFLEVBQUU7Z0JBQ0EsSUFBSSxFQUFFLHVCQUFhO2FBQ3RCO1NBQ0o7UUFDRCxPQUFPLEVBQUUsVUFBQyxNQUFXLEVBQUUsRUFBUztnQkFBUixVQUFFO1lBQ3RCLE1BQU0sQ0FBQyxVQUFLLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsVUFBUSxJQUFJLENBQUMsRUFBSSxLQUFLLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FDSjtJQUNELFVBQVUsRUFBRTtRQUNSLElBQUksRUFBRSxJQUFJLHFCQUFXLENBQUMsZ0JBQVEsQ0FBQztRQUMvQixJQUFJLEVBQUU7WUFDRixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLHVCQUFhO2FBQ3RCO1NBQ0o7UUFDRCxPQUFPLEVBQUUsVUFBQyxNQUFXLEVBQUUsRUFBYztnQkFBYixvQkFBTztZQUMzQixNQUFNLENBQUMsVUFBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7UUFDOUQsQ0FBQztLQUNKO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLHVCQUFhO1FBQ25CLE9BQU8sRUFBRSxVQUFDLE1BQVcsRUFBRSxJQUFTLEVBQUUsT0FBWSxFQUFFLEVBQWdCO2dCQUFmLHdCQUFTO1lBQ3RELElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNSLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3pCLENBQUM7WUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzFCLENBQUM7S0FDSjtDQUNKLENBQUM7QUFFRiw0REFBNEQ7QUFDNUQsSUFBTSxNQUFNLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQztJQUNqQyxJQUFJLEVBQUUsUUFBUTtJQUNkLE1BQU0sRUFBRSxVQUFVO0NBQ3JCLENBQUMsQ0FBQztBQUVVLFFBQUEsTUFBTSxHQUFHLElBQUksdUJBQWEsQ0FBQztJQUNwQyxLQUFLLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQztRQUN6QixJQUFJLEVBQUUsV0FBVztRQUNqQixNQUFNLGFBQ0YsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxjQUFNLE9BQUEsQ0FBQyxFQUFFLENBQUMsRUFBSixDQUFJO2FBQ3RCLElBQ0UsVUFBVSxDQUNoQjtLQUNKLENBQUM7SUFDRixRQUFRLEVBQUUsSUFBSSwyQkFBaUIsQ0FBQztRQUM1QixJQUFJLEVBQUUsY0FBYztRQUNwQixNQUFNLEVBQUU7WUFDSixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLGdCQUFRO2dCQUNkLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLHFCQUFhO3FCQUN0QjtpQkFDSjtnQkFDRCxPQUFPLEVBQUUsVUFBQyxNQUFNLEVBQUUsRUFBTTt3QkFBTCxjQUFJO29CQUNuQixVQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUM7Q0FDTCxDQUFDLENBQUMifQ==