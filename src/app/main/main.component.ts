import { Component, OnInit } from '@angular/core';
import { City } from '../place/models/city.interface';
import axios from 'axios';
import { Country } from '../place/models/country.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

  //Se definen los componentes que se van a mostrar en la vista
  listCmponent = [
    {"id" : 0, "name" : "place"},
    {"id" : 1, "name" : "budget"},
    {"id" : 2, "name" : "history"}
  ];

  //Se define el componente seleccionado
  componentSelected = this.listCmponent[0];

  //Se define si se puede pasar al siguiente paso
  canNext = false;

  //Se definen las variables que se van a enviar al componente hijo
  countrySelected: Country = {} as Country;
  citySelected: City = {} as City;
  budgetSelected: number = 0;

  //Se definen las funciones para enviar los datos al componente hijo
  setCountry(country: Country) {
    this.countrySelected = country;
  }
  setCity(city: City) {
    this.citySelected = city;
  }
  setDataBudget(budget: number) {
    this.budgetSelected = budget;
  }

  //Se define la función para validar si se puede pasar al siguiente paso
  nextValid(isValid: boolean) {
    if(isValid) {
      this.canNext = true;
    }
  }

  //Se define la función para pasar al siguiente paso
  nextStep() {
    this.componentSelected = this.listCmponent[this.componentSelected.id +1];
    this.canNext = false;
  }

  //Se define la función para regresar al paso anterior
  prevStep() {
    this.componentSelected = this.listCmponent[this.componentSelected.id-1];
  }

  //Se define la función para regresar al primer paso
  goToFirstPage(){
    this.componentSelected = this.listCmponent[0];
  }
}
