import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WorkoutsGQL, Workout } from '~/generated/graphql/backend-service';
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'workoutsList',
  templateUrl: './workoutsList.component.html',
  styleUrls: ['./workoutsList.component.css']
})

export class WorkoutsListComponent implements OnInit {

  workouts: Array<Workout> 

  constructor( 
    private workoutsGQL: WorkoutsGQL,
    private router: Router,
    private _routerExtensions: RouterExtensions) {
      this.workouts=[]
    }
  
  //----------------------------------------
  ngOnInit() {
   this.getAllWorkouts(); 
  }
  //----------------------------------------
  // execute workouts query (send request to server and reveive all wourkouts details)
  getAllWorkouts(){
    this.workoutsGQL.fetch(null, {fetchPolicy:'network-only'})
    .subscribe((data) =>  {
      this.workouts = data.data.workouts
    }, err => console.log(err))
  }
  //------------------------------------------
  // go to add new workout page
  toAddNewWorkout(){
    this.router.navigate(["/addWorkout"]);
  }
  //------------------------------------------
  // go to login page
  toLogin(){
    
    this.router.navigate(["/login"]);
  }
  //-------------------------------------------
  // fire when pull the list to refresh 
  onPullToRefreshInitiated(args: ListViewEventData){
    setTimeout( () => {
      /* 
      - to update workouts list:
          1) update apollo cache.
          2) then call getAllWorkouts() to provide updated workouts.
      - I tried many times to find way to update cache according to
      structure in 'backend-service.ts' but unfortunately I didn't find any solution. :(
      */

      // updated
      const listView = args.object;
      listView.notifyPullToRefreshFinished();
      console.log('updated!')
    }, 1000);
  }

}
