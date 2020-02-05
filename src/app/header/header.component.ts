
import { Component, OnInit, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  refresh() {
    if (sessionStorage.getItem("greeting")){
      this.greeting =sessionStorage.getItem("greeting");
    }
    else{
      this.greeting = "No user logged in";
    }
    console.log(this.greeting);
  }
   
  public greeting: string;
  constructor() { 
  }

  ngOnInit() {
    this.refresh();
  }

  
}
