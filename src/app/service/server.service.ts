import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public url = environment.rootUrl+`/server`;
  constructor(private http: HttpClient) { 
  }

  public getCategories ():Observable<string[]>{
    return this.http.get<string[]>(this.url);
   }
}
