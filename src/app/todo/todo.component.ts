import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalService } from '../local.service';
import { FilterService } from '../filter.service';
import { GeneratorIdService } from '../helpers/generatorId.service';

import { FilterComponent } from '../filter/filter.component';

export interface Todo {
  id: number;
  value: string;
  editing: boolean;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, FilterComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [];
  newTask = '';
  filteredTodos: Todo[] = [];
  filter = 'all';

  constructor(
    private local: LocalService,
    private filterService: FilterService,
    private generatorIdService: GeneratorIdService
  ) {
    this.loadTodos();
  }

  private loadTodos() {
    const storedTodos = this.local.getItem('todos');
    if (storedTodos) {
      this.todos = storedTodos;
      this.applyFilter();
    }
  }

  addTodo() {
    if (this.newTask.trim()) {
      const newTodo: Todo = {
        id: this.generatorIdService.generatorId(),
        value: this.newTask.trim(),
        completed: false,
        editing: false,
      };
      this.todos.push(newTodo);
      this.newTask = '';
      this.local.setItem('todos', this.todos);
      this.applyFilter();
    }
  }

  toggleComplete(todo: Todo) {
    todo.completed = !todo.completed;
    this.local.setItem('todos', this.todos);
    this.applyFilter();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.local.setItem('todos', this.todos);
    this.applyFilter();
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }

  saveTodo(todo: Todo, updatedTask: string) {
    if (updatedTask.trim()) {
      todo.value = updatedTask.trim();
      todo.editing = false;
      this.local.setItem('todos', this.todos);
      this.applyFilter();
    }
  }

  cancelEdit(todo: Todo) {
    todo.editing = false;
  }

  applyFilter() {
    this.filteredTodos = this.filterService.filterTodos(
      this.todos,
      this.filter
    );
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }
}
