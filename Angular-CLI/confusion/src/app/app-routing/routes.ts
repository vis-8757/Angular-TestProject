//to make code clean and putting alll the routes at one place
import {Routes} from '@angular/router';
//also need to import all the components that have to be routed to
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
//
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
//  
export const routes: Routes = [
    {path: 'aboutus', component:AboutComponent},
    { path: 'home',  component: HomeComponent },
    { path: 'menu',     component: MenuComponent },
    { path: 'dishdetail/:id', component:DishdetailComponent},
// '/id:' is needed so that the dishdetail component doesnt just render any random dish. but by id.
// it gets id as defined and supplied from router then renders accordingly.
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'contactus', component:ContactComponent}
  ];