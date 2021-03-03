import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../data-service.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SnackbarService} from 'ngx-snackbar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerListComponent implements OnInit {

  page =1;
  pageSize = 10;
  totalItem=0;
  customerStatus=true;
  searchValue = '';
  sortingColumnName= '';
  isDesc = true;
  customerListData =[];
  selectedCustomerId = 0;
  modelTitle = 'Add Customer';
  customer={
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  };
  address={
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    isPrimary: false
  };

  constructor(private _http:DataServiceService,private route: Router,private modalService: NgbModal,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.getCustomers(this.page,this.pageSize,this.customerStatus,this.searchValue);
  }

  searchCustomer(){
    this.getCustomers(this.page,this.pageSize,this.customerStatus,this.searchValue);
  }

  editCustomer(customer){
    this.modelTitle = 'Edit Customer'
    this.customer = Object.assign({},customer);
    this.selectedCustomerId = customer._id;
  }

  deleteSelectedCustomer(){
    this._http.deleteCustomer(this.selectedCustomerId).
      subscribe(result =>{
        this.modalService.dismissAll();
        this.selectedCustomerId= null;
        this.snackBar(result.message,'#27AE60');
      }, (error)=>{
        this.snackBar('Something went wrong','#E12931');
     });
  }

  getCustomers(page,pageSize,customerStatus,searchValue){
      this._http.getCustomers(page,pageSize,customerStatus,searchValue).
      subscribe(result =>{
          this.customerListData = result.data[0].data;
          this.totalItem = result.data[0].metadata.length ? result.data[0].metadata[0].total :0;

      }, (error)=>{
        this.snackBar(error.error.message,'#E12931');
     });

  }

  onNewCustomerSave(form: NgForm) {
    if (form.valid) {

      if(this.selectedCustomerId){
        this._http.editCustomer({
          id: this.selectedCustomerId,
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          emailAddress: form.value.emailAddress,
          phoneNumber: form.value.phoneNumber
        }).
        subscribe(result =>{
          this.modalService.dismissAll();
          this.selectedCustomerId= null;
          this.snackBar(result.message,'#27AE60');
          this.getCustomers(this.page,this.pageSize,this.customerStatus,this.searchValue);
        }, (error)=>{
          this.snackBar(error.error.message,'#E12931');
       });
      }else{
        this._http.saveCustomer({
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          emailAddress: form.value.emailAddress,
          phoneNumber: form.value.phoneNumber
        }).
        subscribe(result =>{
          this.modalService.dismissAll();
          this.snackBar(result.message,'#27AE60');
          this.getCustomers(this.page,this.pageSize,this.customerStatus,this.searchValue);
        }, (error)=>{
          this.snackBar(error.error.message,'#E12931');
       });
      }
      
    }else{
      this.snackBar('Invalid details','#E12931');
    }
  }

  onNewAddressSave(form: NgForm) {
    if (form.valid) {
        this._http.saveAddress({
          addressLine1: form.value.addressLine1,
          addressLine2: form.value.addressLine2,
          city: form.value.city,
          state: form.value.state,
          country: form.value.country,
          zipCode: form.value.zipCode,
          isPrimary: form.value.isPrimary === 'true'? true : false,
          customerId: this.selectedCustomerId
        }).
        subscribe(result =>{
          this.modalService.dismissAll();
          this.snackBar(result.message,'#27AE60');
        }, (error)=>{
          this.snackBar(error.error.message,'#E12931');
       });
    }else{
      this.snackBar('Invalid details','#E12931');
    }
  }

  paginationChange(){
    this.getCustomers(this.page,this.pageSize,this.customerStatus,this.searchValue);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


  snackBar(message,bgColor){
    const _this = this;
    this.snackbarService.add({
      msg: message,
      timeout: 5000,
      background: bgColor,
      action: {
        text: ''
      },
    });     
  }

}
