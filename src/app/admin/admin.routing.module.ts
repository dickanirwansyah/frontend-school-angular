import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { SiswaComponent } from "./siswa/siswa.component";

const routes: Routes = [
     {
          path: '', 
          component: LayoutComponent, 
          children: [
               { path: '', component: DashboardComponent },
               { path: 'dashboard', component: DashboardComponent},
               { path: 'accounts', component: AccountsComponent},
               { path: 'siswa', component: SiswaComponent}
          ]
     }
]


@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class AdminRoutingModule {

}