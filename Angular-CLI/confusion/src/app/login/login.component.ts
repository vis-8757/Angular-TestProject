import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user={
    username:'', password:'', remember:false
  };

  constructor(public dialogRef:MatDialogRef<LoginComponent>) { }
  //refrence to login component 

  ngOnInit() {
  }

  onSubmit(){
console.log('UserNaam: ', this.user);
this.dialogRef.close();
//we are actuallly closing the LoginComponent (with the dialog box) here, upon submitting
 //thats why it was needed to refer to LoginComponent from MatDialogRef.
  }
}
