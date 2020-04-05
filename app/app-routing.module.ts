import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { WorkoutsListComponent } from './workoutsList/workoutsList.component';
import { WorkoutDetailsComponent } from './workoutDetails/workoutDetails.component';
import { addNewWorkoutComponent } from './addNewWorkout/addNewWorkout.component';


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "workouts", component:WorkoutsListComponent},
    { path: "workout/:id", component:WorkoutDetailsComponent},
    { path: "", redirectTo: "/addWorkout", pathMatch: "full" },
    { path: "addWorkout", loadChildren: () => import ("~/app/addNewWorkout/addNewWorkout.module").then((m) => m.AddNewWorkoutModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
