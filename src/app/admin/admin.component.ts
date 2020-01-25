import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public company:Company;
    public isShowAllUsers: boolean;
    public users:User[];
    public companies:Company[];
      constructor(public companyService : CompanyService,public userService :UserService
    ) { 
        

    this.company = new Company();
  }

  ngOnInit() {
    this.isShowAllUsers=false;
    this.setAllCompanies();
  }
 public setCurrentCompany (company:Company){
    this.company=company;
  }
public getUser ():void{
  //following inly test, must be deleted
  const observable1 = this.userService.getUser(3);
  observable1.subscribe(user => {
      alert("ok user got");
      console.log(user);
}, serverErrorResponse => { 
  console.log(serverErrorResponse);
});

//end of test
}

public getAllUsers ():void{
    this.isShowAllUsers=true;
    //following inly test, must be deleted
    const observable1 = this.userService.getAllUsers();
    observable1.subscribe(users=> {
       this.users=users;
        
  }, serverErrorResponse => { 
    console.log(serverErrorResponse);
    
  });
  
  //end of test
  }

  public setAllCompanies(): void {
    console.log("getting all companies...")
    const observable = this.companyService.getAllCompanies();
    observable.subscribe(companies => {
        this.companies = [];
        let company = new Company();
        this.companies.push(company);
        this.companies = this.companies.concat(companies);
    
  }, serverErrorResponse => { 
  
  if (serverErrorResponse.error.errorNumber==0){
      alert("Server offline!");
      return;
  }

  else {
alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message + 
"additional" + serverErrorResponse.errorNumber);
}
});
}
  public createCompany(): void {
    
    const observable = this.companyService.createCompany(this.company);
    observable.subscribe(successfulServerRequestData => {
        this.setAllCompanies();
        alert("Company created succesfully!");

    
  }, serverErrorResponse => { 
    console.log(serverErrorResponse);
  if (serverErrorResponse.error.errorNumber==604){
      //company already exist
    alert("Company name already exist!");
    return;
  }
 
  if (serverErrorResponse.error.errorNumber==0){
      alert("Server offline!");
      return;
  }

  else {
alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message + 
"additional" + serverErrorResponse.errorNumber);
}
});
}
}
