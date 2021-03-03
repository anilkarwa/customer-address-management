import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/customer.component';
import { PagenotfoundComponent} from './pagenotfound/pagenotfound.component'

const routes: Routes = [
  {path:'',redirectTo: '/customer', pathMatch: 'full'},
  {path:'customer',component:CustomerListComponent},
  {path:'notfound',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
