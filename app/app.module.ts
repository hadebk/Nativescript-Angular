import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import {GraphQLModule} from "~/app/graphql.module";
import { WorkoutsListComponent } from './workoutsList/workoutsList.component';
import {WorkoutDetailsComponent} from './workoutDetails/workoutDetails.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        GraphQLModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        WorkoutsListComponent,
        WorkoutDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
		// other services
	]
})
export class AppModule {
}
