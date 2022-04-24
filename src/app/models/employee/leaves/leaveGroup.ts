import { Holiday, IHoliday } from "../../team/holidays";
import { Leave } from "./leave"

export class LeaveGroup {
    id: Date = new Date()
    leaves: Leave[] = [];

    constructor(lvs?: Leave[]) {
        this.leaves = [];
        if (lvs) {
            lvs.sort((a,b) => a.compareTo(b))
            if (lvs.length > 0) {
                this.id = new Date(lvs[0].leave_date);
            }
            lvs.forEach(lv => {
                this.leaves.push(new Leave(lv));
            })
            this.leaves.sort((a,b) => a.compareTo(b));
        }
    }

    compareTo(other: LeaveGroup): number {
        return (this.id.getTime() < other.id.getTime()) ? -1 : 1;
    }

    addLeave(lv: Leave) {
        this.leaves.push(new Leave(lv));
        if (lv.leave_date.getTime() < this.id.getTime()) {
            this.id = lv.leave_date;
        }
    }
}

export class LeaveMonth {
    id: Date = new Date();
    groups: LeaveGroup[] = [];

    constructor(month: Date, lvg?: LeaveGroup[]) {
        this.id = month;
        this.groups = [];
        if (lvg) {
            lvg.forEach(lg => {
                this.groups.push(lg);
            });
            this.groups.sort((a,b) => a.compareTo(b));
        }
    }

    compareTo(other: LeaveMonth): number {
        return (this.id.getTime() < other.id.getTime()) ? -1 : 1;
    }

    addLeaveGroup(lg: LeaveGroup) {
        this.groups.push(lg);
    }
}

export class LeaveHoliday {
    holiday: Holiday = new Holiday()
    leaves: Leave[] = [];

    constructor(hol?: IHoliday, lvs?: Leave[]) {
        this.holiday = new Holiday(hol);
        this.leaves = [];
        if (lvs) {
            lvs.forEach(lv => {
                this.leaves.push(lv);
            });
            this.leaves.sort((a,b) => a.compareTo(b));
        }
    }

    compareTo(other: LeaveHoliday) {
        return this.holiday.compareTo(other.holiday);
    }

    addLeave(lv: Leave) {
        this.leaves.push(new Leave(lv));
        this.leaves.sort((a,b) => a.compareTo(b));
    }

    getHours(): number {
        let answer = 0;
        this.leaves.forEach(lv => {
            answer += lv.hours;
        });
        return answer;
    }
}