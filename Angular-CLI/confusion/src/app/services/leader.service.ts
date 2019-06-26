import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Promise<Leader[]>{
    return new Promise(resolve=>{setTimeout(()=>resolve(LEADERS),2000)});
  }
  getLeader(id:string):Leader{
    return LEADERS.filter((Leader)=>Leader.id)[id];
  }
 getFeaturedLeader():Promise<Leader>{
return new Promise(resolve=>{setTimeout(()=>resolve(LEADERS.filter((Lead)=>Lead.featured)[0]),2000)});
// it can be anything at the place of Lead.
 }

}

