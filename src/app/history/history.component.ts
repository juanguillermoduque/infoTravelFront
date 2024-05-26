import { Component, Input, OnInit } from '@angular/core';
import { City } from '../place/models/city.interface';
import axios from 'axios';
import { API_EXCHANGE, API_OPEN_WEATHER_MAP } from '../global-constants';
import { Country } from '../place/models/country.interface';
import { HistoryService } from './service/history.service';
import { History } from './models/history.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  //Se definen las variables de entrada que llegan desde el componente padre
  @Input() country: Country = {} as Country;
  @Input() city: City = {} as City;
  @Input() budget: number = 0;

  //Se definen las variables que se van a mostrar en la vista
  temperature: string = "";
  moneyName: string = "";
  moneySymbol: string = "";
  moneyCharacter: string = "";
  exchangeRate:number = 0;
  convertedBudget:number = 0;

  //Se define la lista de historial, en caso de que exista historial
  history: History[] = [];

  constructor(
    private historyService: HistoryService
  ) { }

  //Se obtiene la temperatura de la ciudad seleccionada desde la API de OpenWeatherMap
  async getTemperature() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.apiName}&appid=${API_OPEN_WEATHER_MAP}`;
    try {
      const response = await axios.get(url);
      this.temperature = `${response.data.main.temp - 273.15}°C`;
    } catch (error) {
      this.temperature = 'No se pudo obtener la temperatura';
    }
  }


  //Se obtiene la moneda del país seleccionado desde la API de restcountries
  async getMoney() {
    const url = 'https://restcountries.com/v3.1/name/';
    try {
      const response = await axios.get(`${url}${this.country.apiName}`);
      if (response.data && response.data.length > 0) {
        const countryData = response.data[0];
        const currencyKey = Object.keys(countryData.currencies)[0];
        const currency = countryData.currencies[currencyKey];
        this.moneyName = currency.name;
        this.moneySymbol = currency.symbol;
        this.moneyCharacter = currencyKey;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener la moneda:', error);
      return null;
    }
  }

  //Se obtiene la tasa de cambio de la moneda seleccionada desde la API de ExchangeRate
  async getExchangeMoney() {
    const exchangeRateApiUrl = `https://v6.exchangerate-api.com/v6/${API_EXCHANGE}/latest/COP`;
    try {
      const response = await axios.get(exchangeRateApiUrl);
      this.exchangeRate = response.data.conversion_rates[this.moneyCharacter];
      this.convertedBudget = this.budget * this.exchangeRate;
      return null;
    } catch (error) {
      console.error('Error al obtener la tasa de cambio:', error);
      return null;
    }
  }

  //Se guarda el historial de la búsqueda realizada
  saveHistory() {
    const historyData:History = {
      country: this.country.name,
      city: this.city.name,
      budget: this.budget,
      temperature: this.temperature,
      moneyName: this.moneyName,
      moneySymbol: this.moneySymbol,
      exchangeRate: this.exchangeRate,
      convertedBudget: this.convertedBudget
    };
    this.historyService.saveHistory(historyData).subscribe(
      data=>console.log(data)
    );
  }


  //Se obtiene el historial de búsquedas realizadas
  async getHistory() {
    this.historyService.getHistory().subscribe(
      data=>{
        this.history = data;
        console.log(data);
      }
    );
  }


  //Se inicializan los métodos para obtener el historial de consultas, la temperatura, la moneda, la tasa de cambio, y se guarda la consulta en el historial
  async ngOnInit() {
    await this.getHistory();
    await this.getTemperature();
    await this.getMoney();
    await this.getExchangeMoney();
    this.saveHistory();
  } 
}
