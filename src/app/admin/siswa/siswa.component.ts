import { Component, OnInit } from "@angular/core";
import { SiswaService } from "src/app/service/siswa.service";


@Component({
     selector: 'app-siswa',
     templateUrl: './siswa.component.html',
     styleUrls: ['./siswa.component.css']
})
export class SiswaComponent implements OnInit{

     listSiswa : any[] = [];
     currentPage = 0;
     pageSize = 5;
     totalRecords = 0;
     textSearch = '';
     isEdit = 0;
     base64Avatar: string = ''

     constructor(private siswaService:SiswaService){}

     ngOnInit(): void {
          this.loadData();
     }

     loadData(){
          this.siswaService.listSiswa(this.currentPage, this.pageSize, this.textSearch)
               .subscribe(response => {
                    this.listSiswa = response.data.content;
                    this.totalRecords = response.data.totalElements;
               },error => {
                    console.log(error)
               })
     }

     loadImage(base64Image:string):any{
        return this.base64Avatar = `data:image/jpeg;base64,${base64Image}`;
     }
}