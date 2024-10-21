import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  currentFilter: string = 'all';

  @Output() filterChanged = new EventEmitter<string>();

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.filterChanged.emit(filter);
  }
}
