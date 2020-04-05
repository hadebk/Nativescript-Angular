import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms"

import { AddNewWorkoutRoutingModule } from "./addNewWorkout-routing.module";
import { addNewWorkoutComponent } from "./addNewWorkout.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddNewWorkoutRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        addNewWorkoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddNewWorkoutModule { }
