import { Coupon } from './models/Coupon';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http: HttpClient) { 
  }

  public getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>("http://localhost:8080/coupons");
}
}
