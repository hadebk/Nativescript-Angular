import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CreateWorkoutGQL } from '~/generated/graphql/backend-service';
import { Page } from "tns-core-modules/ui/page";
import { alert } from "tns-core-modules/ui/dialogs";
import * as localStroage from 'nativescript-localstorage';
import { Workout } from "../shared/addWorkout.model";
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  prompt,
  PromptResult,
  PromptOptions,
  inputType,
  capitalizationType
} from "tns-core-modules/ui/dialogs";

@Component({ 
  selector: 'addNewWorkout',
  templateUrl: './addNewWorkout.component.html',
  styleUrls: ['./addNewWorkout.component.css']
})

export class addNewWorkoutComponent implements OnInit {

  workout : Workout

  cache : any
  
  // init options of prompt
  options: PromptOptions = {
    title: "Add New Tag",
    okButtonText: "Add",
    cancelButtonText: "Cancel",
    cancelable: true,
    inputType: inputType.text,
    capitalizationType: capitalizationType.sentences
  }

  constructor(
    private router: Router,
    private createWorkoutGQL: CreateWorkoutGQL,
    private page: Page)
    { 

    // hide action bar
    this.page.actionBarHidden = true

    this.workout = new Workout();

    this.workout.tags=[]

    // get user id from login activity
    this.workout.userId=Number(localStroage.getItem('User_ID'));
  }
  
  ngOnInit() {}

  //------------------------------------
  // check inputs before login 
  save(){
    if (!this.workout.name || !this.workout.description 
      || !this.workout.distanceMeters || !this.workout.durationSeconds) 
    {
      // there is some inputs has no values!
      this.alert("Please provide all fields!");
      return;
    }else{
      // all inputs has values, so execute 'addNewWourkout' function
      this.addNewWourkout();
    }
  }
  //-------------------------------------
  // execute mutate to add new workout, (send request to server)
  addNewWourkout(){
    this.createWorkoutGQL.mutate({
    'userId':Number(this.workout.userId),'name':this.workout.name, 
    'description':this.workout.description, 'tags':this.workout.tags,
    'distanceMeters':Number(this.workout.distanceMeters), 
    'durationSeconds':Number(this.workout.durationSeconds)
    })
    .subscribe((data) => {
      console.log("added successfully!", data.data.createWorkout);
      this.router.navigate(["/workouts"]);
    }, err => console.log(err));
  }
  //----------------------------------
  // after cancel go back to workouts activity
  cancel(){
    this.router.navigate(["/workouts"]);
  }
  //-----------------------------------
  // recieve name from prompt and add it to tags array in workout
  addTagName(){
    prompt(this.options).then((result: PromptResult) => {
      if(result.text.length > 0){
        this.workout.tags.push({'name':result.text})
      }
    });
  }
  //------------------------------------
  // delete tag from tags array be it's index
  tag_delete(index){
    this.workout.tags.splice(index, 1)
  }
  //----------------------------------
  // init alert 
  alert(message: string) {
    return alert({
        title: "Enduco",
        okButtonText: "OK",
        message: message
    });
  }

}


