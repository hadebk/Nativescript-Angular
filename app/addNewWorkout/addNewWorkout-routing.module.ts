import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { addNewWorkoutComponent } from "./addNewWorkout.component";

const routes: Routes = [
    { path: "", component: addNewWorkoutComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddNewWorkoutRoutingModule { }
