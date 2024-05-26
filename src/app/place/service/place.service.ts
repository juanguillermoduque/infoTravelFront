import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL_COUNTRY , API_URL, API_URL_CITY, API_URL_BY_COUNTRY } from 'src/app/global-constants';
import { Country } from '../models/country.interface';
import { City } from '../models/city.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(
    private http: HttpClient
   ) { }

  public getAllCountries() : Observable<Country[]>{
    return this.http.get<Country[]>(API_URL + API_URL_COUNTRY );
  }

  public getCitiesByCountry(id: number) : Observable<City[]>{
    return this.http.get<City[]>(API_URL + API_URL_CITY + '/' + id + API_URL_BY_COUNTRY);
  }
}
