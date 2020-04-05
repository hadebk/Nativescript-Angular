import {Apollo, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "apollo-cache-inmemory";
import {NgModule} from "@angular/core";
import {HttpLinkModule} from "apollo-angular-link-http";
import {createHttpLink} from "apollo-link-http";

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: []
})
export class GraphQLModule {

    constructor(apollo: Apollo) {

        apollo.createNamed("BackendServiceGraphQLClient", {
            link: createHttpLink({
                uri: "http://3.126.250.34:9543/"
            }),
            // see https://github.com/apollographql/apollo-client/issues/1564
            cache: new InMemoryCache({addTypename: true})
        });

    }
}
