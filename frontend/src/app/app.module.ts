import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer/customer.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceService } from './data-service.service';
import { SnackbarModule } from 'ngx-snackbar';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    SnackbarModule.forRoot()
  ],
  providers: [
    DataServiceService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }