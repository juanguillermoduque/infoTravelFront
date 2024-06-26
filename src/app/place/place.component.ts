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

  //Se definen las variables de salida que se van a enviar al componente padre
  @Output() validData = new EventEmitter<boolean>();
  @Output() city = new EventEmitter<City>();
  @Output() country = new EventEmitter<Country>();


  //Se definen las variables que se van a mostrar en la vista
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

  //Se obtiene la lista de países
  public getCountriesList() {
    this.placeService.getAllCountries().subscribe(
      (data: Country[]) => {
        this.countriesList = data;
      }
    );
  }

  //Se obtiene la lista de ciudades por país
  public getCitiesList(){
    this.placeService.getCitiesByCountry(this.countrySelected.id).subscribe(
      (data: City[]) => {
        this.citiesList = data;
      }
    );
  }

  //Se valida cuando se selecciona un país para obtener las ciudades de ese país
  public onCountryChange(event: any): void {
    this.getCitiesList();
  }

  //Se valida cuando se selecciona una ciudad para enviar los datos al componente padre
  public onCityChange(event: any): void {
    this.validData.emit(true);
    this.city.emit(this.citySelected)
    this.country.emit(this.countrySelected)
  }
}
