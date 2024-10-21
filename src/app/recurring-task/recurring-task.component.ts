import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurring-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recurring-task.component.html',
  styleUrl: './recurring-task.component.css'
})
export class RecurringTaskComponent {
  @Input() recurring: string = 'none';
  @Output() recurringChange = new EventEmitter<string>();

  onRecurringChange(event: Event) {
    this.recurringChange.emit((event.target as HTMLSelectElement).value)
  }
}
