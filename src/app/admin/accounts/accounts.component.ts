import { Component, OnInit, TemplateRef, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AccountsService } from "src/app/service/accounts.service";


@Component({
     selector: 'app-accounts',
     templateUrl: './accounts.component.html',
     styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{

     dataAccounts: any[] = [];
     dataDropdownRoles: any[] = [];
     currentPage = 0;
     pageSize = 5;
     totalRecords = 0;
     textSearch = '';
     private modalService = inject(NgbModal);
     
     
     accountsForm = new FormGroup({
          fullname: new FormControl("",[Validators.required]),
          rolesId: new FormControl("",[Validators.required]),
          email: new FormControl("",[Validators.required]),
          password: new FormControl("", [Validators.required]),
          dob: new FormControl("", [Validators.required])
     })

     constructor(private accountsService:AccountsService){}

     ngOnInit(): void {
         this.loadData();
         this.loadDropdownRoles();
     }

     loadData(){
          console.log("text search = "+this.textSearch);
          console.log("current page = "+this.currentPage);
          console.log("page size = "+this.pageSize);
          this.accountsService.listAccounts(this.currentPage, this.pageSize, this.textSearch)
               .subscribe(response => {
                    console.log("fetching data accounst..");
                    this.dataAccounts = response.data.content;
                    this.totalRecords = response.data.totalElements
               }, error => {
                    console.log(error)
               })
     }

     loadDropdownRoles(){
          this.accountsService.dropdownRoles()
               .subscribe(response => {
                    this.dataDropdownRoles = response.data;
               },error => {
                    console.log(error)
               })
     }


     onPageChange(event: any) {
          this.currentPage = event.pageIndex;
          this.pageSize = event.pageSize;
          console.log("current page = "+this.currentPage);
          console.log("page size = "+this.pageSize);
          this.loadData();
     }

     onSearch() {
          this.currentPage = 0;
          this.loadData();
     }

     open(content: TemplateRef<any>){
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				
			},
			(reason) => {
				
			},
		);          
     }

     save(){
          console.log(this.accountsForm.value);
          this.accountsService.saveAccounts(this.accountsForm.value)
               .subscribe(response => {
                    console.log(response)
                    this.accountsForm.reset();
                    this.modalService.dismissAll();
                    this.loadData();
               },error => {
                    console.log(error);
                    alert(error.error.message);
               })
     }
}