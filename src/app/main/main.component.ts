import { HeaderService } from './../header/header.service';
import { UserLoginDetails } from './../models/UserLoginDetails';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
    private usersService: UserService;
    private header : HeaderService;
    public frmSignup: FormGroup;
    constructor(private fb: FormBuilder, usersService : UserService,private router: Router, header : HeaderService) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
        this.header = header;
    }

    
    createSignupForm(): FormGroup {
        return this.fb.group(
          {
            // email is required and must be a valid email email
            email: [null, Validators.compose([
               Validators.email,
               Validators.required])
            ],
            password: [ null, Validators.compose([
               // 1. Password Field is Required
               Validators.required,
               // 2. check whether the entered password has a number
               CustomValidators.patternValidator(/\d/, { hasNumber: true }),
               // 3. check whether the entered password has upper case letter
               CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
               // 4. check whether the entered password has a lower-case letter
               CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
              
               // 6. Has a minimum length of 8 characters
               Validators.minLength(8)])
            ],
            confirmPassword: [null, Validators.compose([Validators.required])]
         },
         {
            // check whether our password and confirm password match
            validator: CustomValidators.passwordMatchValidator
         });
      }

    public login(): void{
      // Creating an observable object
      // It looks like an http request had been issued BUT IT DIDN'T
      const observable = this.usersService.login(this.userLoginDetails);

      // The method subscribe() ussues an http request to the server
      // successfulServerRequestData
      observable.subscribe(successfulServerRequestData => {
          console.log(successfulServerRequestData);                    
          
          this.usersService.setLoginToken(successfulServerRequestData.token);

          if(successfulServerRequestData.userType == "CUSTOMER"){
              this.header.setUserType("Hello, "+this.userLoginDetails.username);
              this.router.navigate(["/customer"]);
          }

          if(successfulServerRequestData.userType == "ADMIN"){
            this.header.setUserType("Admin "+this.userLoginDetails.username);
              this.router.navigate(["/admin"]);
          }

          if(successfulServerRequestData.userType == "COMPANY"){
            this.header.setUserType("Company "+successfulServerRequestData.companyName);
              this.router.navigate(["/company"]);
          }
      }, serverErrorResponse => { // Reaching here means that the server had failed
                  // serverErrorResponse is the object returned from the ExceptionsHandler
                  console.log(serverErrorResponse);
                if (serverErrorResponse.error.errorNumber==609){
                    //wrong username
                  alert(serverErrorResponse.error.errorName);
                  return;
                }
                if (serverErrorResponse.error.errorNumber==613){
                    //wrong password
                    alert(serverErrorResponse.error.errorName);
                    return;
                }
                if (serverErrorResponse.error.errorNumber==0){
                    alert("Server offline!");
                    return;
                }

                else {
          alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message + 
          " additional " + serverErrorResponse.errorNumber);
              }
      }); 

  }


  ngOnInit() {
  }

}
