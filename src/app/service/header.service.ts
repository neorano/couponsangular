import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public greeting: string="";
  public usertype:string;
  constructor() { 
    this.refresh();
  }


refresh() {
    if (sessionStorage.getItem("greeting")){
      this.greeting =sessionStorage.getItem("greeting");
    }
    else{
      this.greeting = "No user logged in";
    }
    if (sessionStorage.getItem("usertype")){
      this.usertype =sessionStorage.getItem("usertype");
    }
    else{
      this.usertype = "";
    }
    
  }

  setGreeting (greeting:string)
  {
    this.greeting = greeting;
  }

}
