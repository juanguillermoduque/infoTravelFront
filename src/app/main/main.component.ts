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

  text: string = '¡Bienvenido a nuestra aplicación!';
  translatedText: string = '';

  listCmponent = [
    {"id" : 0, "name" : "place"},
    {"id" : 1, "name" : "budget"},
    {"id" : 2, "name" : "history"}
  ];

  componentSelected = this.listCmponent[0];
  canNext = false;
  countrySelected: Country = {} as Country;
  citySelected: City = {} as City;
  budgetSelected: number = 0;

  setCountry(country: Country) {
    this.countrySelected = country;
  }

  setCity(city: City) {
    this.citySelected = city;
  }

  setDataBudget(budget: number) {
    this.budgetSelected = budget;
  }

  nextValid(isValid: boolean) {
    if(isValid) {
      this.canNext = true;
    }
  }

  nextStep() {
    this.componentSelected = this.listCmponent[this.componentSelected.id +1];
    this.canNext = false;
  }

  prevStep() {
    this.componentSelected = this.listCmponent[this.componentSelected.id-1];
  }

  async translateText(targetLang: string) {
    const url = 'https://libretranslate.com/translate';

    try {
      const response = await axios.post(url, {
        q: this.text,
        source: 'es',
        target: targetLang,
        format: 'text'
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      this.translatedText = response.data.translatedText;
      console.log('Texto',this.translatedText);
    } catch (error) {
      console.error('Error al traducir:', error);
    }
  }
}
