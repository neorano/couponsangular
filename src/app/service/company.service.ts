import { Coupon } from './../models/Coupon';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
private url = environment.rootUrl+"/companies"
    constructor(private http: HttpClient) {
  }
  public createCompany(company: Company):Observable<void> {

      return this.http.post<void>(this.url, company);
    }

    public updateCompany(company:Company):Observable<void> {
      
      return this.http.put<void>(this.url, company);
    }
  
  
    public getCompany(id:number):Observable<Company> {
      let url = this.url +`/${id}`
      return this.http.get<Company>(url);
    }
  
    public deleteCompany(id:number):Observable<void> {
    let url = this.url +`/${id}`
    return this.http.delete<void>(url);
    }
  
    
    public getAllCompanies ():Observable<Company[]> {
    
      return this.http.get<Company[]>(this.url);
    }
    
  
    public getCompanyCoupons():Observable<Coupon[]>{
    let url = this.url +`/getCoupons`
      return this.http.get<Coupon[]>(url);
    }

    public getCouponsByMaxPrice(maxPrice  :number):Observable<Coupon[]>{
      let url = this.url +`/getCouponsByMaxPrice`
      
    let params = new HttpParams().set('maxPrice', `${maxPrice}`);
        return this.http.get<Coupon[]>(url, { params: params});
      }


      public getCouponsByCategory(category:string):Observable<Coupon[]>{
        let url = this.url +`/getCouponsByCategory`
        let params = new HttpParams().set('category', category);
        return this.http.get<Coupon[]>(url, { params: params});
        }


    }
    



