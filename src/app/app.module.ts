import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './place/place.component';
import { BudgetComponent } from './budget/budget.component';
import { HistoryComponent } from './history/history.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    BudgetComponent,
    HistoryComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
