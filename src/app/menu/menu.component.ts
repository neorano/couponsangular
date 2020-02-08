import { HeaderService } from './../service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public headerService:HeaderService) { }

  ngOnInit() {
    this.headerService.refresh();
  }

}
