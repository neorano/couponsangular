import { ServerService } from './../service/server.service';
import { CompanyService } from './../service/company.service';

import { Coupon } from './../models/Coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public coupons : Coupon[];
  public selectedCategory:string;
  public categories:string[];

  public isShowCoupons: boolean;
  constructor(private companyService: CompanyService, private serverService:ServerService) {

   }

  ngOnInit() {
    let observable = this.serverService.getCategories();
    observable.subscribe(categories => {

      this.categories = categories;
      this.selectedCategory = categories[0];
    }, error =>{
      alert('Failed to get categoriies ' + JSON.stringify(error));
    });

  }
  showCoupon(currentCoupon) {
      
  }
  setCategory (category:string){
    this.selectedCategory = category;
  }

  getCouponsByCategory() {
    this.isShowCoupons = true;
   
      let observable = this.companyService.getCouponsByCategory(this.selectedCategory);

  observable.subscribe(couponsList => {
    this.coupons = couponsList;
  
  }, error =>{
    alert('Failed to get coupons ' + JSON.stringify(error));
  });

  }
}
