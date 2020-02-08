import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PurchasesService } from 'src/app/service/purchases.service';
import { Purchase } from 'src/app/models/Purchase';

@Component({
  selector: 'app-customer-purchases',
  templateUrl: './customer-purchases.component.html',
  styleUrls: ['./customer-purchases.component.css']
})
export class CustomerPurchasesComponent implements OnInit {
    public purchases:Purchase[];
  constructor(public purchasesService: PurchasesService,private router: Router) { }

  ngOnInit() {
    this.showPurchases();
  }

  showCoupons(){

    this.router.navigate(["/customer"]);
  }

    showPurchases() {
        let observable = this.purchasesService.getAllPurchases();
        observable.subscribe(purchasesList => {
            this.purchases = purchasesList;
            //this.coupons.sort((a, b) => a.company.name.localeCompare(b.company.name));

        }, serverErrorResponse => {
            alert(serverErrorResponse.error.errorName);
        });
    }

}
