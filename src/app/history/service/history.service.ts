import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from '../models/history.interface';
import { API_URL, API_URL_HISTORY } from 'src/app/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient
   ) { }

  public getHistory() : Observable<History[]>{
    return this.http.get<History[]>(API_URL + API_URL_HISTORY );
  }

  public saveHistory(dataHistory: History){
    return this.http.post(API_URL + API_URL_HISTORY ,dataHistory);
  }
}
