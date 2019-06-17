import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
showleaders:Leader[];
gLeader:Leader;
 
  constructor(private leaderservice:LeaderService) { }

  ngOnInit() {
    //let id= LEADERS.id;
    this.showleaders=this.leaderservice.getLeaders();
    console.log(this.showleaders);
    let id1=LEADERS[2].id; 
    //get a way to show a ransom int number from 0 to 3 
    this.gLeader=this.leaderservice.getLeader(id1);

  }

}
