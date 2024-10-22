import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocalService } from '../local.service';
import { FilterService } from '../filter.service';
import { GeneratorIdService } from '../helpers/generatorId.service';

import { FilterComponent } from '../filter/filter.component';
import { PriorityComponent } from '../priority/priority.component';
import { TagsComponent } from '../tags/tags.component';
import { DeadlineComponent } from '../deadline/deadline.component';
import { RecurringTaskComponent } from '../recurring-task/recurring-task.component';

export interface Todo {
  id: number;
  value: string;
  editing: boolean;
  completed: boolean;
  priority: string;
  tags: string[];
  deadline: Date;
  recurring: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    FilterComponent,
    PriorityComponent,
    TagsComponent,
    DeadlineComponent,
    RecurringTaskComponent,
  ],
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
        priority: 'medium',
        tags: [],
        deadline: new Date(),
        recurring: 'none',
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
  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }

  saveTodoPriority(todo: Todo, newPriority: string) {
    todo.priority = newPriority;
    this.local.setItem('todo', this.todos);
  }
  changeTags(todo: Todo, tags: string[]) {
    todo.tags = tags;
    this.local.setItem('todo', this.todos);
  }

  changeDeadline(todo: Todo, newDeadline: Date) {
    todo.deadline = newDeadline;
    this.local.setItem('todo', this.todos);
  }

  changeRecurring(todo: Todo, newRecurring: string) {
    todo.recurring = newRecurring;
    this.local.setItem('todo', this.todos);
  }
}
