import { Injectable } from "@angular/core";
import { ProcessHTTPMsgService } from "./process-httpmsg.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WeatherInfoService {
  private appId: string;
  private appCode: string;
  public weather: any;
  public coordinates: {
    latitude: "12.9716";
    longitude: "77.5946";
  };

  constructor(private http: HttpClient, private proc: ProcessHTTPMsgService) {
    this.appId = "4YsomIkuUxafVDTzYxx2";
    this.appCode = "OpOrYqHc5D-kRjtHgYRDsw";
    this.weather = [];
  }

  public getWeather() {
    return this.http
      .jsonp(
        "https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" +
          "12.9716" +
          "&longitude=" +
          "77.5946" +
          "&app_id=" +
          this.appId +
          "&app_code=" +
          this.appCode,
        "jsonpCallback"
      )
      .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
      .pipe(catchError(this.proc.handleError));

    /*.subscribe(result => {
            this.weather = result.forecast;
        }, error => {
            console.error(error);
        });
        */
  }
}
