import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { WorkoutGQL, DeleteWorkoutGQL,Workout } from '~/generated/graphql/backend-service';
import { Page } from "tns-core-modules/ui/page";
import { ID } from "../shared/workout.model";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({ 
  selector: 'workoutDetails',
  templateUrl: './workoutDetails.component.html',
  styleUrls: ['./workoutDetails.component.css']
})

export class WorkoutDetailsComponent implements OnInit {

  workout : Workout;

  workoutId:ID;

  isVisible :boolean;

  HasData :boolean;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private page: Page, private workoutGQL:WorkoutGQL, 
    private deleteWorkoutGQL:DeleteWorkoutGQL,
    private _routerExtensions: RouterExtensions)
  {

    // hide action bar
    this.page.actionBarHidden = true;

    this.isVisible = false

    this.HasData = false
  
  }
  //--------------------------------------------
  ngOnInit() { 
    // receive id of workout from previous activity
    this.workoutId = this.route.snapshot.params.id;
    // execute workout query (send request to server and reveive wourkout details)
    this.workoutGQL.watch({ id : Number(this.workoutId)})
    .valueChanges
    .subscribe((data) => { 

      this.workout = data.data.workout;

      this.HasData = true

      // check if this workout has tags or not
      if(data.data.workout.tags.length > 0 ){
        this.isVisible = true
      }
      
    }, err => console.log(err))
  }
  //---------------------------------------------
  // convert time (in sec) to this format (hh:mm,ss)
  convert_time_format(sec){
    let hours = Math.floor(sec / 3600);
    sec %= 3600;
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;

    return "0"+hours+":"+minutes+","+seconds
  }
  //----------------------------------------------
  // execute delete workout mutation (send request to server to delete wourkout by id)
  delete_workout(){
    this.deleteWorkoutGQL.mutate({workoutId:Number(this.workoutId)}).subscribe(() => {
      console.log("Done!");
      // delete this workout then go back to workouts list page
      //this.router.navigate(["/workouts"])
      this._routerExtensions.backToPreviousPage();
    }, err => console.log(err));
  }
  //-----------------------------------------------
  // go to workouts list page
  back(){
    this.router.navigate(["/workouts"]);
  }
}


