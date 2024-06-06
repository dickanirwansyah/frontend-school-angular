import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutComponent } from "./layout/layout.component";
import { AdminRoutingModule } from "./admin.routing.module";
import { AccountsComponent } from "./accounts/accounts.component";
import { SiswaComponent } from "./siswa/siswa.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
     declarations: [
          LayoutComponent,
          AccountsComponent,
          SiswaComponent
     ],
     imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          AdminRoutingModule,
          MatPaginatorModule,
          NgbModalModule,
     ]
})
export class AdminModule {

}