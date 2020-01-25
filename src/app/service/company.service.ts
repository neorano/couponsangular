import { Coupon } from './../models/Coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient) {
  }
  public createCompany(company: Company):Observable<void> {

      return this.http.post<void>("http://localhost:8080/companies", company);
    }

    public updateCompany(company:Company):Observable<void> {
      let url = "http://localhost:8080/companies"
      return this.http.put<void>(url, company);
    }
  
  
    public getCompany(id:number):Observable<Company> {
      let url = `http://localhost:8080/companies/${id}`
      return this.http.get<Company>(url);
    }
  
    public deleteCompany(id:number):Observable<void> {
    let url = `http://localhost:8080/companies/${id}`
    return this.http.delete<void>(url);
    }
  
    
    public getAllCompanies ():Observable<Company[]> {
      let url = "http://localhost:8080/companies"
      return this.http.get<Company[]>(url);
    }
    
  
    public getCompanyCoupons():Observable<Coupon[]>{
    let url = `http://localhost:8080/companies/getCoupons`
      return this.http.get<Coupon[]>(url);
    }

    public getCouponsByMaxPrice(maxPrice  :number):Observable<Coupon[]>{
      let url = `http://localhost:8080/companies/getCouponsByMaxPrice`
      
    let params = new HttpParams().set('maxPrice', `${maxPrice}`);
        return this.http.get<Coupon[]>(url, { params: params});
      }


      public getCouponsByCategory(category:string):Observable<Coupon[]>{
        let url = `http://localhost:8080/companies/getCouponsByCategory`
        let params = new HttpParams().set('category', category);
        return this.http.get<Coupon[]>(url, { params: params});
        }


    }
    



