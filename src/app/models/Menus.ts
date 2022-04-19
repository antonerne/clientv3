export class HeaderItem {
    title: string = "";
    menus: MenuItem[] = [];

    constructor(t: string) {
        this.title = t;
    }

    hasRole(role: string): boolean{
        var answer = false;
        this.menus.forEach(menu => {
            if (menu.hasRole(role)) {
                answer = true;
            }
        });
        return answer;
    }

    getMenuItemsForRole(role: string): MenuItem[] {
        var answer: MenuItem[] = [];
        this.menus.forEach(menu => {
            if (menu.hasRole(role)) {
                answer.push(new MenuItem(menu.title, menu.link));
            }
        });
        return answer
    }
}

export class MenuItem {
    title: string = "";
    link: string = "";
    roles: string[] = [];

    constructor(t: string, l: string) {
        this.title = t;
        this.link = l;
    }

    hasRole(role: string): boolean {
        var answer = false;
        this.roles.forEach(r => {
            if (role.toLowerCase() === r.toLowerCase()) {
                answer = true;
            }
        });
        return answer;
    }
}

export class Menus {
    menus: HeaderItem[] = [];
}