import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { WeatherInfoService } from "../services/weather-info.service";

@Component({
  selector: "app-weather-here",
  templateUrl: "./weather-here.component.html",
  styleUrls: ["./weather-here.component.scss"]
})
export class WeatherHereComponent implements OnInit {
  private appId: string;
  private appCode: string;
  public weather: [];
  errMsg: string;
  valid: boolean;

  public constructor(
    private http: HttpClient,
    private weatherService: WeatherInfoService
  ) {
    /*this.appId= "4YsomIkuUxafVDTzYxx2";
    this.appCode= "OpOrYqHc5D-kRjtHgYRDsw";
    this.weather=[];
    */
  }

  ngOnInit() {
    /* if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position=> {
          this.weatherService.getWeather(position.coords);
      });
  } else {
     this.valid=true ;
  }*/

    this.weatherService.getWeather().subscribe(
      info => {
        this.weather = info.forecast;
      },
      varErr => (this.errMsg = <any>varErr)
    );
  }
}
