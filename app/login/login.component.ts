import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { alert } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import {LoginGQL} from "~/generated/graphql/backend-service";
import { User } from "../shared/user.model";
import * as localStroage from 'nativescript-localstorage';

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

    user: User;

    ngOnInit(): void{}

    constructor(
        private loginGQL: LoginGQL,
        private page: Page,
        private router: Router)
    {
        // hide action bar
        this.page.actionBarHidden = true;

        // init user
        this.user = new User();

        this.user.userName="test@test.de";
        this.user.password="test";
    }
    //---------------------------------------------------
    // validate email input to recieve valid form of email
    ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return true
        }else{
            return false
        }
    }
    //----------------------------------------------------
    // check user inputs, it run when click on 'login' button
    submit() {
        if (!this.user.password || !this.ValidateEmail(this.user.userName)) {
            this.alert("Please provide both, valid email and password.");
            return;
        }else{
            this.login();
        }
    }
    //----------------------------------------------------
    // execute login operation
    login() { 
        // execute mutation of login (send request to server to verify user data)
        this.loginGQL.mutate(this.user).subscribe((data) => {
            if(data.data.login !== null){
                // right user
                console.log("login successful with user", data.data.login);
                this.router.navigate(["/workouts"]);
                // to pass user_id to another component
                localStroage.setItem('User_ID', data.data.login.id);
            }else{
                // wrong user
                this.alert("There is something wrong in email or password!")
                this.user.password=''
            }
        }, err => console.log(err));
    }
    //----------------------------------------------------
    // init alert
    alert(message: string) {
        return alert({
            title: "Enduco",
            okButtonText: "OK",
            message: message
        });
    }
}
