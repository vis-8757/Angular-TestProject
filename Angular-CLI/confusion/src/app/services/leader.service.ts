import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders():Leader[]{
    return LEADERS;
  }
  getLeader(id:string):Leader{
    return LEADERS.filter((Leader)=>Leader.id)[id];
  }
 getFeaturedLeader():Promise<Leader>{
return Promise.resolve(LEADERS.filter((Lead)=>Lead.featured)[0]);
// it can be anything at the place of Lead.
 }

}

