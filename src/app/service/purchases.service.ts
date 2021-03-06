import { Observable } from 'rxjs';
import { Purchase } from './../models/Purchase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private url = environment.rootUrl+`/purchases`;
  constructor(private http: HttpClient) { }

  public  createPurchase(purchase:Purchase):Observable<void>   {
		return this.http.post<void>(this.url,purchase);

	}


    public  updatePurchase(purchase:Purchase):Observable<void>{
      
      // should not be accessible, can create problems
      // return this.http.put<void>(this.url,purchase);
      return
  
    }

    public getPurchase (id:number):Observable<Purchase>{
      return this.http.get<Purchase>(this.url+`/${id}`);
     }
  
   public deletePurchase (id:number):Observable<Purchase>{
      return this.http.delete<Purchase>(this.url+`/${id}`);
     }
  
    public getAllPurchases(): Observable<Purchase[]> {
      return this.http.get<Purchase[]>(this.url);
  }


}


