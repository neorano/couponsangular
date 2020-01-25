import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDetails } from './models/UserLoginDetails';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from './models/SuccessfulLoginServerResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private http: HttpClient;
  private loginToken:string;

    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
      // this.http = http;
  }
  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

      // Inside the brackets <> is the type of a successful server response
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // THE FOLLOWING LINE IS IS NOT AN HTTP REQUEST BEING SENT
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
      //  The http request will be sent after the subscribe() method will be called

      return this.http.post<SuccessfulLoginServerResponse>("http://localhost:8080/users/login", userLoginDetails);
    
    }


  public createUser(userLoginDetails: UserLoginDetails): Observable<void> {        
        
    return this.http.post<void>("http://localhost:8080/users", userLoginDetails);
}
public getLoginToken(): string{
  return this.loginToken;
}

public setLoginToken(token:any): void{
  this.loginToken = token;
}

}


