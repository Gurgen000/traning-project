import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  
  setItem(key: string, data:any) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getItem(key:string): any {
    const storeData = localStorage.getItem(key);
    if (storeData) {
      return JSON.parse(storeData)
    }
    return null
  }

  removeItem (key: string) {
    localStorage.removeItem(key)
  }
}
