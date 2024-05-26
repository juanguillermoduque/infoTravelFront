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

  public budget: number = 0;

  public selectBudget(budget: number, currency: string) {
    this.budget = budget;
  }

  public onBudgetInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = parseInt(inputElement.value);
    if(newValue > 0) {
      this.validData.emit(true);
      this.data.emit(newValue);
    }
  }

}
