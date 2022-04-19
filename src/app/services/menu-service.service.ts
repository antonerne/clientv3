import { Injectable } from '@angular/core';
import { HeaderItem, MenuItem, Menus } from '../models/Menus';
import * as list from './menus.json';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  roles: string[] = [];
  public MenuList: HeaderItem[] = [];

  constructor() {
    var dlist = (list as any)
    if (dlist.menus) {
      dlist.menus.forEach( (h: HeaderItem) => {
        this.MenuList.push(h);
      })
    }
   }

   getMenus(roles: string[]): HeaderItem[]
   {
     var answer: HeaderItem[] = []
     roles.forEach(role => {
        this.MenuList.forEach(head => {
          if (head.hasRole(role)) {
            var found = false;
            for (let i=0; i < answer.length && !found; i++) {
              if (answer[i].title === head.title) {
                
              }
            }
          }
        });
     });
     return answer;
   }
}
