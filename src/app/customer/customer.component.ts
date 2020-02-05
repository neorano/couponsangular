import { CouponsService } from '../service/coupons.service';
import { Coupon } from './../models/Coupon';
import { Component, OnInit } from '@angular/core';
import { Purchase } from '../models/Purchase';
import { PurchasesService } from '../service/purchases.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    constructor( private couponsService: CouponsService,
         private purchasesService: PurchasesService, private router: Router) { }
    public coupons: Coupon[];
    public selectedCoupon: Coupon;
    public minPrice:number;

    public isShowAllCoupons: boolean;



    ngOnInit() {
        this.showCoupons();
        this.minPrice = 0;
    }


    public showCoupon(coupon: Coupon) {

        this.selectedCoupon = coupon;

        this.isShowAllCoupons = false;
    }



    public showCoupons() {
        this.isShowAllCoupons = true;

        let observable = this.couponsService.getAllCoupons();
        observable.subscribe(couponsList => {
            this.coupons = couponsList;
            this.coupons.sort((a, b) => a.company.name.localeCompare(b.company.name));

        }, error => {
            alert('Failed to get coupons ' + JSON.stringify(error));
        });
    }
    showPurchases(){
        this.router.navigate(["/purchases"]);
    }
    

    public purchaseCoupon() {
        let purchase = new Purchase(this.selectedCoupon, 1);
        let observable = this.purchasesService.createPurchase(purchase);
        observable.subscribe(response => {
            this.showCoupons();
            alert("success");


        }, error => {
            if (error.error.errorNumber == 607) {
                alert("Not enough coupons!");
                return;
            }
            if (error.error.errorNumber == 611) {
                alert("too early, coupon still not available");
                return;
            }
            if (error.error.errorNumber == 610) {
                alert("Coupon expired,sorry");
                return;
            }
            alert('Failed to make purchase' + JSON.stringify(error)); 
        });

    }

}

