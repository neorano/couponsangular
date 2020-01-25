import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // private http: HttpClient;

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
      // this.http = http;
  }
  public createCompany(company: Company) {

      return this.http.post("http://localhost:8080/companies", company);
    
    }

}


