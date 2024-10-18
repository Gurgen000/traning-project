import { Injectable } from '@angular/core';
import { Todo } from './todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterTodos(todos: Todo[], filter: string): Todo[] {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    } else if (filter === 'incomplete') {
      return todos.filter((todo) => !todo.completed)
    }
    return todos;
  }
}
