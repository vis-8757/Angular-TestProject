import { Component, OnInit, Inject } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {flyInOut, expand} from '../app.animation';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {
showleaders:Leader[];
grLeader:Leader;
//id1:string;
leadErrMess:string;
 
  constructor(private leaderservice:LeaderService,  @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    //let id= LEADERS.id;
   // this.showleaders=this.leaderservice.getLeaders();
   
   // -------------- Promises -------------------
  // this.leaderservice.getLeaders().then((showleaders)=>this.showleaders=showleaders);
   // console.log(this.showleaders);
   // let id1=LEADERS[2].id; 
    //get a way to show a random int number from 0 to 3 
   // --> this.gLeader=this.leaderservice.getLeader(id1); **

  // --------------- Promises ------------------------

this.leaderservice.getLeaders().subscribe(out=>this.showleaders=out, varErr=>this.leadErrMess=varErr);

  }

}
