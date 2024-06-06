import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
     providedIn: 'root'
})
export class AuthenticationService {

     url = environment.apiUrl

     constructor(private httpClient:HttpClient){}

     authentication(data:any){
          return this.httpClient.post(this.url + '/backoffice-service/backoffice-service/v1/login',data,{
               headers: new HttpHeaders().set('Content-Type', 'application/json')
          });
     }
}