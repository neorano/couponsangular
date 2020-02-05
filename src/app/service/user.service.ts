import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
  }
  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    let url =  "http://localhost:8080/users/login";
    return this.http.post<SuccessfulLoginServerResponse>(url, userLoginDetails);
    }
   

//   public createUser(userLoginDetails: UserLoginDetails): Observable<void> {        
        
//     return this.http.post<void>("http://localhost:8080/users", userLoginDetails);
// }
    public getUser(id:number):Observable<User>{
        let url = `http://localhost:8080/users/${id}`;
    
        return this.http.get<User>(url);
    }

    public  createUser(user:User, password:string):Observable<void>{
        let httpOptions = {
            headers: new HttpHeaders({
            })
          };
        httpOptions.headers =
      httpOptions.headers.set('password', password);
        let url = `http://localhost:8080/users`;
        return this.http.post<void>(url,user,httpOptions);
    }

    public  updateUser(user:User):Observable<void>{
        let url = `http://localhost:8080/users`;
        return this.http.put<void>(url,user);
    }

    public deleteUser(id:number):Observable<void>{
        let url = `http://localhost:8080/users/${id}`;
        return this.http.delete<void>(url);
    }

    public getAllUsers():Observable<User[]>{
        let url = `http://localhost:8080/users`;
        return this.http.get<User[]>(url);
    }



}


