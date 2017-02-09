"use strict";
var graphql_1 = require("graphql");
var db_1 = require("./db");
exports.authorType = new graphql_1.GraphQLObjectType({
    name: 'Author',
    description: 'The creator of books',
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLString,
            resolve: function (author) { return "author-" + author.id; },
        },
        name: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        books: {
            type: new graphql_1.GraphQLList(exports.bookType),
            resolve: function (author) {
                var authorsBooks = db_1.books.filter(function (book) { return book.authorId === author.id; });
                return authorsBooks;
            }
        }
    }); },
});
exports.bookType = new graphql_1.GraphQLObjectType({
    name: 'Book',
    description: 'Words on a page, tells a story.',
    fields: function () { return ({
        id: {
            type: graphql_1.GraphQLString,
            resolve: function (book) { return "book-" + book.id; },
        },
        title: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        authorId: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        author: {
            type: exports.authorType,
            resolve: function (book) {
                return db_1.authors[book.authorId];
            }
        }
    }); },
});
exports.bookInputType = new graphql_1.GraphQLInputObjectType({
    name: 'BookInput',
    fields: function () { return ({
        id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        image: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        authorId: { type: graphql_1.GraphQLString },
    }); },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2plZmZ3aGVscGxleS9vcGVuc291cmNlL2dyYXBocWwtaGFja2F0aG9uL3BhY2thZ2VzL2dyYXBocWwtc2VydmVyLyIsInNvdXJjZXMiOlsic3JjL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxtQ0FLaUI7QUFDakIsMkJBQXNDO0FBRXpCLFFBQUEsVUFBVSxHQUFzQixJQUFJLDJCQUFpQixDQUFDO0lBQy9ELElBQUksRUFBRSxRQUFRO0lBQ2QsV0FBVyxFQUFFLHNCQUFzQjtJQUNuQyxNQUFNLEVBQUUsY0FBTSxPQUFBLENBQUM7UUFDWCxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsdUJBQWE7WUFDbkIsT0FBTyxFQUFFLFVBQUMsTUFBTSxJQUFLLE9BQUEsWUFBVSxNQUFNLENBQUMsRUFBSSxFQUFyQixDQUFxQjtTQUM3QztRQUNELElBQUksRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQzNCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQzVCLEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJLHFCQUFXLENBQUMsZ0JBQVEsQ0FBQztZQUMvQixPQUFPLEVBQUUsVUFBQyxNQUFNO2dCQUNaLElBQU0sWUFBWSxHQUFHLFVBQUssQ0FBQyxNQUFNLENBQzdCLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsRUFBRSxFQUEzQixDQUEyQixDQUN0QyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDeEIsQ0FBQztTQUNKO0tBQ0osQ0FBQyxFQWhCWSxDQWdCWjtDQUNMLENBQUMsQ0FBQztBQUVVLFFBQUEsUUFBUSxHQUFzQixJQUFJLDJCQUFpQixDQUFDO0lBQzdELElBQUksRUFBRSxNQUFNO0lBQ1osV0FBVyxFQUFFLGlDQUFpQztJQUM5QyxNQUFNLEVBQUUsY0FBTSxPQUFBLENBQUM7UUFDWCxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsdUJBQWE7WUFDbkIsT0FBTyxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsVUFBUSxJQUFJLENBQUMsRUFBSSxFQUFqQixDQUFpQjtTQUN2QztRQUNELEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQzVCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQzVCLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQy9CLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSx1QkFBYSxFQUFDO1FBQ2xDLE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxrQkFBVTtZQUNoQixPQUFPLEVBQUUsVUFBQyxJQUFJO2dCQUNWLE1BQU0sQ0FBQyxZQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7U0FDSjtLQUNKLENBQUMsRUFmWSxDQWVaO0NBQ0wsQ0FBQyxDQUFDO0FBRVUsUUFBQSxhQUFhLEdBQTJCLElBQUksZ0NBQXNCLENBQUM7SUFDNUUsSUFBSSxFQUFFLFdBQVc7SUFDakIsTUFBTSxFQUFFLGNBQU0sT0FBQSxDQUFDO1FBQ1gsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFFLHVCQUFhLEVBQUM7UUFDekIsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLHVCQUFhLEVBQUM7UUFDNUIsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLHVCQUFhLEVBQUM7UUFDNUIsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLHVCQUFhLEVBQUM7UUFDbEMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLHVCQUFhLEVBQUM7S0FDbEMsQ0FBQyxFQU5ZLENBTVo7Q0FDTCxDQUFDLENBQUMifQ==