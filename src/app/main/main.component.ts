import { CustomerService } from './../service/customer.service';
import { HeaderService } from './../header/header.service';
import { UserLoginDetails } from './../models/UserLoginDetails';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { LoginActivateGuard } from '../login-activate.guard';
import { Customer } from '../models/Customer';
import { User } from '../models/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public newCustomer:Customer;
    public newPassword:string;

  public userLoginDetails: UserLoginDetails;
    private header : HeaderService;
    public frmSignup: FormGroup;
    public isUserLoggedIn:boolean;
    constructor(private fb: FormBuilder, public usersService : UserService, 
        public customerService: CustomerService,
        private router: Router, header : HeaderService) {

            
        this.userLoginDetails = new UserLoginDetails();
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
  
      const observable = this.usersService.login(this.userLoginDetails);

      observable.subscribe(successfulServerRequestData => {
          console.log(successfulServerRequestData);                    
          
          //this.usersService.setLoginToken(successfulServerRequestData.token);
          sessionStorage.setItem("token",successfulServerRequestData.token);
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
                    alert(serverErrorResponse.error.errorName);
              }
      }); 

  }

  public logOut ():void{
    sessionStorage.removeItem("token");
    this.isUserLoggedIn =  false;
    this.header.logout();
  }

  public register() {
    let observable = this.customerService.createCustomer(this.newCustomer,this.newPassword);
   
    observable.subscribe(successfulServerRequestData => {

      alert("user "+this.newCustomer.user.username+" succesfully created!");

    }, serverErrorResponse => { 
      console.log(serverErrorResponse);
      alert(serverErrorResponse.error.errorName);
        }); 

  }


  ngOnInit() {
    this.newPassword="";
      let user = new User("CUSTOMER");
      this.newCustomer=new Customer(user,"","","",0);
    if (sessionStorage.getItem("token")) {
        this.isUserLoggedIn =  true;

    }else {
        this.isUserLoggedIn =  false;
    }

  }

}
