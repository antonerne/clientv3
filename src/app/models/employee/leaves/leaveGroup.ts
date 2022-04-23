import { Leave } from "./leave"

export class LeaveGroup {
    id: Date = new Date()
    leaves: Leave[] = [];

    constructor(lvs: Leave[]) {
        this.leaves = [];
        lvs.sort((a,b) => a.compareTo(b))
        this.id = new Date(lvs[0].leave_date);
        lvs.forEach(lv => {
            this.leaves.push(new Leave(lv));
        })
        this.leaves.sort((a,b) => a.compareTo(b));
    }

    addLeave(lv: Leave) {
        this.leaves.push(new Leave(lv));
        if (lv.leave_date.getTime() < this.id.getTime()) {
            this.id = lv.leave_date;
        }
    }
}