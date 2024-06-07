import { Component, OnInit, TemplateRef, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbDateStruct, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
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
     isEdit = 0;
     private modalService = inject(NgbModal);
     modelDob!: NgbDateStruct;
     
     
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
          this.isEdit = 0;
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				
			},
			(reason) => {
				
			},
		);          
     }

     edit(content: TemplateRef<any>, id:string){
          this.isEdit = 1;
          this.accountsService.findAccountsById(id)
                         .subscribe(response => {
                              this.accountsForm.get('fullname')?.patchValue(response.data.fullname)
                              this.accountsForm.get('rolesId')?.patchValue(response.data.rolesId)
                              this.accountsForm.get('email')?.patchValue(response.data.email)
                              //convert date to ngbdate
                              const dobDate = response.data.dob;
                              this.modelDob = this.parseDateFromDob(dobDate);
                         },error => {
                              console.log(error)
                         })
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				
			},
			(reason) => {
				
			},
		);      
     }

     parseDate(data:any):string {
          const year = data.year;
          const month = data.month.toString().padStart(2,'0');
          const day = data.day.toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
     }

     parseDateFromDob(data:any): NgbDateStruct {
          const dateConvert = data.split("-");
          return {
               year: +dateConvert[0],
               month: +dateConvert[1],
               day: +dateConvert[2]
             };
     }

     save(){
          console.log(this.accountsForm.value);
          var databackoffice = {
               "fullname" : this.accountsForm.get('fullname')?.value,
               "rolesId" : this.accountsForm.get('rolesId')?.value,
               "email" : this.accountsForm.get('email')?.value,
               "password" : this.accountsForm.get('password')?.value,
               "dob" : this.parseDate(this.accountsForm.get('dob')?.value)
          }
          this.accountsService.saveAccounts(databackoffice)
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