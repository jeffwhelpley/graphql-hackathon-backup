"use strict";
var express = require("express");
var cors = require("cors");
var graphqlHTTP = require("express-graphql");
var auth = require("basic-auth");
var schema_1 = require("./schema");
var app = express();
app.use(cors());
app.use('/', function (req, res) {
    graphqlHTTP({
        schema: schema_1.schema,
        pretty: true,
        graphiql: true,
        rootValue: {
            user: auth(req)
        },
    })(req, res);
});
var port = process.env.NODE_ENV ? 80 : 5000;
app.listen(port, function () {
    console.log("app started on port " + port);
});
// once app is started, execute queries like so:
// curl localhost:5000 -d "query={authors{id,name, books{id}}}"
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC1zZXJ2ZXIuc3RhcnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2plZmZ3aGVscGxleS9vcGVuc291cmNlL2dyYXBocWwtaGFja2F0aG9uL3BhY2thZ2VzL2dyYXBocWwtc2VydmVyLyIsInNvdXJjZXMiOlsic3JjL2dyYXBocWwtc2VydmVyLnN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpQ0FBbUM7QUFDbkMsMkJBQTZCO0FBQzdCLDZDQUErQztBQUMvQyxpQ0FBbUM7QUFDbkMsbUNBQWtDO0FBRWxDLElBQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBRXRCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ2xCLFdBQVcsQ0FBQztRQUNSLE1BQU0sRUFBRSxlQUFNO1FBQ2QsTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2xCO0tBQ0osQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqQixDQUFDLENBQUMsQ0FBQztBQUVILElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFFOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixJQUFNLENBQUMsQ0FBQztBQUMvQyxDQUFDLENBQUMsQ0FBQztBQUVILGdEQUFnRDtBQUNoRCwrREFBK0QifQ==