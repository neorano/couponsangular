import { HeaderService } from './../service/header.service';

import { Component, OnInit, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  
 
constructor(public headerService: HeaderService) {


  }

  ngOnInit() {
   this.headerService.refresh();
  }
  
  
}
