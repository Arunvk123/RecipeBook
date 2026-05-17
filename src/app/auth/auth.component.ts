import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    constructor(private authService: AuthService, private router: Router){}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    onSwitchMoode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm)
    {
        if(!form.valid)
        {
            return;
        }
        console.log(form.value);
        const email = form.value.email;
        const pass = form.value.password;
        let authObs: Observable<AuthResponseData>;

        this.isLoading =true;
        if(this.isLoginMode){
            authObs = this.authService.login(email, pass);
        }
        else{
            authObs = this.authService.signUp(email, pass);
        }
        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMsg => {
                this.error = errorMsg;
                console.log(errorMsg);
                this.isLoading=false;
            }
        );
        form.reset();
    }
}