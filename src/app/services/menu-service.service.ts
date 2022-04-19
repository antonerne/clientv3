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

   getMenus(roles: string[])
   {
     var answer: HeaderItem[] = []
     roles.forEach(role => {
        this.MenuList.forEach(head => {
          if (head.hasRole(role)) {
            var found = false;
            for (let i=0; i < answer.length && !found; i++) {
              if (answer[i].title === head.title) {
                var menuitems = head.getMenuItemsForRole(role)
                menuitems.forEach(mi => {
                  var mifound = false;
                  answer[i].menus.forEach(ami => {
                    if (ami.title.toLowerCase() === mi.title.toLowerCase()) {
                      mifound = true;
                    }
                  });
                  if (!mifound) {
                    answer[i].menus.push(new MenuItem(mi.title, mi.link));
                  }
                })
                found = true
              }
            }
            if (!found) {
              var item = new HeaderItem(head.title);
              var menuitems = head.getMenuItemsForRole(role);
              item.menus.push(...menuitems);
              answer.push(item);
            }
          }
        });
     });
     this.MenuList = answer;
   }
}
