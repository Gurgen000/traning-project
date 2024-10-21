import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();

  addTag(tag: string) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
      this.tagsChange.emit(this.tags);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((tags) => tags !== tag);
    this.tagsChange.emit(this.tags);
  }
}
