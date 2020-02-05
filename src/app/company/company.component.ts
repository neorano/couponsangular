import { CouponsService } from './../service/coupons.service';

import { ServerService } from './../service/server.service';
import { CompanyService } from './../service/company.service';

import { Coupon } from './../models/Coupon';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public newCoupon:Coupon = new Coupon();
  public coupons : Coupon[];
  public selectedCategory:string;
  public categories:string[] = [ "select all"];
  public categoriesForCreation:string[];
  startDate: NgbDate;
  hoveredDate: NgbDate;
  endDate: NgbDate;

  public isShowCoupons: boolean;
  constructor(private companyService: CompanyService, private couponsService:CouponsService , private serverService:ServerService
    ,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
      this.startDate = calendar.getToday();
      this.endDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

   


  ngOnInit() {
    
    let observable = this.serverService.getCategories();
    observable.subscribe(categoriesFromServer => {

      this.categoriesForCreation = categoriesFromServer;
      this.initializeCoupon();
      this.categories = this.categories.concat(categoriesFromServer);
      this.setCategory (this.categories[0]);

    }, serverErrorResponse =>{
      alert(serverErrorResponse.error.errorName);
    });

  }
  showCoupon(currentCoupon) {
      
  }
  setCategory (category:string){
    this.selectedCategory = category;
    if (this.selectedCategory==this.categories[0]){
      this.getAllCouponsOfCurrentCompany();
      return;
    }
    this.getCouponsByCategory();
  }
  getAllCouponsOfCurrentCompany() {
    this.isShowCoupons = true;
    let observable = this.companyService.getCompanyCoupons();

    observable.subscribe(couponsList => {
      this.coupons = couponsList;
    
    }, serverErrorResponse =>{
      alert(serverErrorResponse.error.errorName);
    });
  }
  setNewCouponCategory(category:string){
    this.newCoupon.category = category;

  }
  getCouponsByCategory() {
    this.isShowCoupons = true;
   
      let observable = this.companyService.getCouponsByCategory(this.selectedCategory);

  observable.subscribe(couponsList => {
    this.coupons = couponsList;
  
  }, serverErrorResponse =>{
    alert(serverErrorResponse.error.errorName);
  });

  }

  createCoupon(){
    this.newCoupon.startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day);
    this.newCoupon.endDate = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day);

    let observable = this.couponsService.createCoupon(this.newCoupon);

  observable.subscribe(success => {
    alert ("new coupon created!");
  this.initializeCoupon();
  this.setCategory(this.categories[0]);

  }, serverErrorResponse =>{
    alert(serverErrorResponse.error.errorName);
  });
  }

  initializeCoupon() {
    this.newCoupon = new Coupon();
    this.newCoupon.price=0;
    this.newCoupon.amount=0;
    this.setNewCouponCategory(this.categoriesForCreation[0])

  }
  



  

  onDateSelection(date: NgbDate) {
    if (!this.startDate && !this.endDate) {
      this.startDate = date;
    } else if (this.startDate && !this.endDate && date.after(this.startDate)) {
      this.endDate = date;
    } else {
      this.endDate = null;
      this.startDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.startDate && !this.endDate && this.hoveredDate && date.after(this.startDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.startDate) && date.before(this.endDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.startDate) || date.equals(this.endDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}



