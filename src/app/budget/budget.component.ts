import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  @Output() validData = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<number>();
  
  constructor() { }

  //Se define el presupuesto
  public budget: number = 0;

  public selectBudget(budget: number, currency: string) {
    this.budget = budget;
  }

  //se valida cuando se ingrese un dato en el campo de presupuesto
  public onBudgetInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = parseInt(inputElement.value);
    if(newValue > 0) {
      //Se emite el evento de que el dato es válido y se envía el dato
      this.validData.emit(true);

      //Se emite el evento de que se ha ingresado un nuevo dato y se le envía el dato al componente padre
      this.data.emit(newValue);
    }
  }

}
