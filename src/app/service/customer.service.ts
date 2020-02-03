import { Customer } from './../models/Customer';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = `http://localhost:8080/customers`;
  constructor(private http: HttpClient) { }



  public  createCustomer(customer:Customer, password:string):Observable<void>   {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
  httpOptions.headers =
httpOptions.headers.set('password', password);
		return this.http.post<void>(this.url,customer,httpOptions);

	}


    public  updateCustomer(customer:Customer):Observable<void>{
      return this.http.put<void>(this.url,customer);
  
    }


    public getCustomer (id:number):Observable<Customer>{
      return this.http.get<Customer>(this.url+`/${id}`);
     }
  
   public deleteCustomer (id:number):Observable<Customer>{
      return this.http.delete<Customer>(this.url+`/${id}`);
     }
  
    public getAllCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(this.url);
  }



}
