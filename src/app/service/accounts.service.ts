import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";


@Injectable({
     providedIn: 'root'
})
export class AccountsService {

     url = environment.apiUrl

     constructor(private httpClient:HttpClient){}

     listAccounts(start:number, limit:number, textSearch:string):Observable<any>{
          let params = new HttpParams()
               .set('start', start.toString())
               .set('limit', limit.toString())
               .set('textSearch', textSearch.toString())
          return this.httpClient.get(this.url+'/backoffice-service/backoffice-service/v1/search',{params})
     }

     saveAccounts(data:any):Observable<any>{
          return this.httpClient.post(this.url+'/backoffice-service/backoffice-service/v1/save',data);
     }

     findAccountsById(id:string):Observable<any>{
          return this.httpClient.get(this.url+'/backoffice-service/backoffice-service/v1/find/'+id);
     }

     dropdownRoles():Observable<any>{
          return this.httpClient.get(this.url+'/backoffice-service/backoffice-service/v1/dropdown-roles');
     }
}