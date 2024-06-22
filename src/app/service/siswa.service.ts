import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";


@Injectable({
     providedIn: 'root'
})
export class SiswaService {

     url = environment.apiUrl + '/siswa-service/siswa-service';

     constructor(private httpClient:HttpClient){}

     listSiswa(start:number, limit:number, textSearch:string):Observable<any> {
          let params = new HttpParams()
               .set('start', start.toString())
               .set('limit',limit.toString())
               .set('textSearch', textSearch.toString());
          return this.httpClient.get(this.url + '/v1/search',{params});
     }

     saveSiswa(data:any):Observable<any> {
          return this.httpClient.post(this.url + '/v1/save',data);         
     }
}