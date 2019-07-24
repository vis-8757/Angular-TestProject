import { Injectable } from '@angular/core';
import {Feedback} from '../shared/feedback';
import {baseURL} from '../shared/baseurl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map,catchError} from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import { Dish } from '../shared/Dish';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {
dish:Dish;
feed:Feedback;

 constructor(private http:HttpClient, private proc:ProcessHTTPMsgService) { }

submitFeedback(feed:Feedback):Observable<Feedback>{
  const httpOptions={
headers: new HttpHeaders({
  'headerName':'headerInfo/json'
})}
 return this.http.post<Feedback>(baseURL+'feedback/',feed,httpOptions)
 .pipe(catchError(this.proc.handleError));

}
//returnFirstName(fname:string){
//  return this.http.get<string>(baseURL+'feedback?firstname !=null').pipe(map(feed=>feed.slice(-1)[0]))
//  .pipe(catchError(this.proc.handleError));}
}