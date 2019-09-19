//app.module.ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import "hammerjs";
import { AppComponent } from "./app.component";

import { DishService } from "./services/dish.service";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { PromotionService } from "./services/promotion.service";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { LeaderService } from "./services/leader.service";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { LoginComponent } from "./login/login.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSliderModule } from "@angular/material/slider";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { baseURL } from "./shared/baseurl";
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { HighlightDirective } from "./directives/highlight.directive";
import { WeatherHereComponent } from "./weather-here/weather-here.component";
import { WeatherInfoService } from "./services/weather-info.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    WeatherHereComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    //this supports template driven forms
    MatProgressSpinnerModule,
    MatSliderModule
  ],

  providers: [
    DishService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    { provide: "BaseURL", useValue: baseURL },
    //to provide the base url as a variable value to the entire application
    WeatherInfoService
  ],
  entryComponents: [LoginComponent],
  //to make a comp available to be opened from another comp (without routing/reloading)
  //we need to declare it as entryComp in here.
  bootstrap: [AppComponent]
})
export class AppModule {}
