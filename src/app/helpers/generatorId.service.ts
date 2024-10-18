import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorIdService {

  constructor() { }

  public generatorId(): number {
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += Math.floor(Math.random() * 9);
    }
    return +id;
  }
}
