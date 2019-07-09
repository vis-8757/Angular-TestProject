import { Injectable } from '@angular/core';
import {throwError} from 'rxjs';
import { HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  public handleError(err:HttpErrorResponse|any){
let errMsg:string;
if (err.error instanceof ErrorEvent){
  errMsg=err.error.message;
}
else {
  errMsg= `${err.status} - ${err.statusText || ''} ${err.error}`;
}
return throwError(errMsg);
  }
}
