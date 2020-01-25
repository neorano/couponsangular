import { Coupon } from '../models/Coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  public url = `http://localhost:8080/coupons`;
  constructor(private http: HttpClient) { 
  }

  public  createCoupon(coupon:Coupon):Observable<void>{
    return this.http.post<void>(this.url,coupon);

  }
    public  updateCoupon(coupon:Coupon):Observable<void>{
    return this.http.put<void>(this.url,coupon);

  }
  

   public getCoupon (id:number):Observable<Coupon>{
    return this.http.get<Coupon>(this.url+`/${id}`);
   }

 public deleteCoupon (id:number):Observable<Coupon>{
    return this.http.delete<Coupon>(this.url+`/${id}`);
   }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.url);
}
}
