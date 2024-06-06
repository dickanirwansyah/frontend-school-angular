import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../service/authentication.service";
import { Router } from "@angular/router";

@Component({
     selector: 'app-login',
     templateUrl: './login.component.html',
     styleUrls: ['./login.component.css']
})
export class LoginComponent {
     
     loginForm = new FormGroup({
          email: new FormControl("",[Validators.required]),
          password: new FormControl("",[Validators.required])
     })
     
     constructor(private authenticationService:AuthenticationService,
          private router:Router
     ){}

     doLogin(){
          console.log(this.loginForm.value);
          this.authenticationService.authentication(this.loginForm.value)
               .subscribe((response:any) => {
                    console.log(response);
                    this.router.navigate(['/backoffice/dashboard']);
               },(error) => {
                    console.log(error.error.message);
                    alert(error.error.message +" | "+error.error.statusCode);
               });
     }

}