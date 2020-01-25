import { CouponsService } from '../service/coupons.service';
import { Coupon } from './../models/Coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private couponsService: CouponsService) { }
  public coupons : Coupon[];
  public selectedCoupon : Coupon;

  public isShowAllCoupons: boolean;

  

  ngOnInit() {
    this.isShowAllCoupons = true;
   
      let observable = this.couponsService.getAllCoupons();
  observable.subscribe(couponsList => {
    this.coupons = couponsList;
    this.coupons.sort((a, b)=> a.company.name.localeCompare(b.company.name));
   
  }, error =>{
    alert('Failed to get coupons ' + JSON.stringify(error));
  });

    // this.userService.createUser(new UserLoginDetails("avi", "1234")).subscribe(successfulServerRequestData => {
    //     console.log(successfulServerRequestData);                                        
    // }, serverErrorResponse => {                     
    //     alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
    // }); 
  
  
}


      public showCoupon(coupon: Coupon){
        
        // Debugging using printing the object value in the browser's console
        console.log(coupon);
        this.selectedCoupon = coupon;
     
        this.isShowAllCoupons = false;
      }

   

    public showCoupons(){
        this.isShowAllCoupons = true;
    }

    public purchaseCoupon(){

    }

  }

