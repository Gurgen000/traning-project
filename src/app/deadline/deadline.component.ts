import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deadline',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './deadline.component.html',
  styleUrl: './deadline.component.css',
})
export class DeadlineComponent {
  @Input() deadline!: Date;
  @Output() deadlineChange = new EventEmitter<Date>();

  onDateChange() {
    this.deadlineChange.emit(this.deadline);
  }
}
