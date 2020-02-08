import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url=environment.rootUrl+`/users`;
    constructor(private http: HttpClient) {
  }
  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    let url =  this.url+"/login";
    return this.http.post<SuccessfulLoginServerResponse>(url, userLoginDetails);
    }
   

//   public createUser(userLoginDetails: UserLoginDetails): Observable<void> {        
        
//     return this.http.post<void>("http://localhost:8080/users", userLoginDetails);
// }
    public getUser(id:number):Observable<User>{
        let url = this.url+`/${id}`;
    
        return this.http.get<User>(url);
    }

    public  createUser(user:User, password:string):Observable<void>{
        let httpOptions = {
            headers: new HttpHeaders({
            })
          };
        httpOptions.headers =
      httpOptions.headers.set('password', password);
        
        return this.http.post<void>(this.url,user,httpOptions);
    }

    public  updateUser(user:User):Observable<void>{
        
        return this.http.put<void>(this.url,user);
    }

    public deleteUser(id:number):Observable<void>{
        let url = this.url+`/${id}`;
        return this.http.delete<void>(url);
    }

    public getAllUsers():Observable<User[]>{
        
        return this.http.get<User[]>(this.url);
    }



}


