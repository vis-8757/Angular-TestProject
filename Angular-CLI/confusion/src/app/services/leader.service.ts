import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import { Observable } from 'rxjs';
import {delay, catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
//import {HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
import {ProcessHTTPMsgService} from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient, private proc:ProcessHTTPMsgService) { }

//  getLeaders():Promise<Leader[]>{
//    return new Promise(resolve=>{setTimeout(()=>resolve(LEADERS),2000)}); }

//  getLeader(id:string):Leader{
//    return LEADERS.filter((Leader)=>Leader.id)[id]; }

// getFeaturedLeader():Promise<Leader>{
// return new Promise(resolve=>{setTimeout(()=>resolve(LEADERS.filter((Lead)=>Lead.featured)[0]),2000)}); }

getLeaders():Observable<Leader[]>{
  return this.http.get<Leader[]>(baseURL+'leadership').pipe(delay(2000)).pipe(catchError(this.proc.handleError));
}

getLeader(id:string):Observable<Leader>{
  return this.http.get<Leader[]>(baseURL+'leadership').pipe(catchError(this.proc.handleError))
  .pipe(map(randL=>randL[id]));
//check to get a determined leader rather than a random one, taking help from featuredpromo()
}

getFeaturedLeader():Observable<Leader>{
  return this.http.get<Leader[]>(baseURL+'leadership?featured=true').pipe(map(flead=>flead[0]),delay(2000))
  .pipe(catchError(this.proc.handleError));
}
}

