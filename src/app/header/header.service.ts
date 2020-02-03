import { Injectable, OnInit } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })



export class HeaderService implements OnInit {
    logout() {
        this.UserType = "No user logged in";
    }
    public UserType: string;
  constructor() { 
    this.UserType = "No user logged in";
  }

  ngOnInit() {
  }

  public setUserType (UserType: string){
      this.UserType=UserType;
  }

}