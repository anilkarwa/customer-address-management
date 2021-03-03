import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Client-Service':'frontend-angular',
    'Content-Type' : 'application/json'
  })
};

const API_URL = environment.serviceUlr;


@Injectable()
export class DataServiceService {

  constructor(private http : HttpClient) { }

  public getCustomers(pageNumber,pageSize,status,searchValue): Observable<any>{
    return this.http.get(API_URL + '/api/v1/customer?pageNumber='+pageNumber+'&pageSize='+pageSize+'&status='+status+'&keyword='+searchValue,httpOptions);
  }

  public saveCustomer(data): Observable<any>{
    return this.http.post(API_URL + '/api/v1/customer',data,httpOptions);
  }

  public editCustomer(data): Observable<any>{
    return this.http.put(API_URL + '/api/v1/customer',data,httpOptions);
  }

  public deleteCustomer(id): Observable<any>{
    return this.http.delete(API_URL + `/api/v1/customer-by-id/${id}`,httpOptions);
  }

  public saveAddress(data): Observable<any>{
    return this.http.post(API_URL + '/api/v1/address',data,httpOptions);
  }


}
