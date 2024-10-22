import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.css',
})
export class PriorityComponent {
  @Input() priority: string = 'medium';
  @Output() priorityChange = new EventEmitter<string>();

  changePriority(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.priorityChange.emit(selectElement.value);
  }
}
