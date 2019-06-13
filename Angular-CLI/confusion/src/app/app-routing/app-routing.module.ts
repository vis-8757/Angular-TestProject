import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {routes} from './routes';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)  
  ],
 exports:[
   RouterModule
 //so that RouterModule is available for app.module to use
  ] 
})
export class AppRoutingModule { }

//route parameter
//query parameter