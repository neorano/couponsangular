import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public url = `http://localhost:8080/server`;
  constructor(private http: HttpClient) { 
  }

  public getCategories ():Observable<string[]>{
    return this.http.get<string[]>(this.url);
   }
}
