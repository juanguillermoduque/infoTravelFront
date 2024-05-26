import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlaceService } from './service/place.service';
import { City } from './models/city.interface';
import { Country } from './models/country.interface';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  @Output() validData = new EventEmitter<boolean>();
  @Output() city = new EventEmitter<City>();
  @Output() country = new EventEmitter<Country>();

  public countriesList:Country[] = [];
  public citiesList: City[] = [];
  public countrySelected: Country = {} as Country;
  public citySelected: City = {} as City;
  constructor(
    private placeService: PlaceService
  ) { }

  ngOnInit(): void {
    this.getCountriesList();
  }

  public getCountriesList() {
    this.placeService.getAllCountries().subscribe(
      (data: Country[]) => {
        this.countriesList = data;
      }
    );
  }

  public getCitiesList(){
    this.placeService.getCitiesByCountry(this.countrySelected.id).subscribe(
      (data: City[]) => {
        this.citiesList = data;
      }
    );
  }

  public onCountryChange(event: any): void {
    this.getCitiesList();
  }

  public onCityChange(event: any): void {
    this.validData.emit(true);
    this.city.emit(this.citySelected)
    this.country.emit(this.countrySelected)
  }
}
