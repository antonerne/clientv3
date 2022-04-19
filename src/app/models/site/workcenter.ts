import { Employee } from "../employee/employee";
import { IComparable } from "../utilities/comparable";
import { v4 as uuidv4, v4} from 'uuid';

export class Position implements IComparable<Position> {
    public id?: string | undefined;
    public title: string;
    public is_displayed: boolean;
    public display_order: number;
    public employees?: Employee[] | undefined;

    constructor(other?: Position) {
        this.id = (other && other.id) ? other.id : uuidv4();
        this.title = (other) ? other.title : "";
        this.is_displayed = (other) ? other.is_displayed : false;
        this.display_order = (other) ? other.display_order : 0;
        this.employees = new Array();
        if (other && other.employees) {
            for (let emp of other.employees) {
                this.employees.push(new Employee(emp));
            }
        }
    }

    compareTo(other: Position): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}

export class Shift implements IComparable<Shift> {
    public id?: string | undefined;
    public title: string;
    public display_order: number;
    public shift_codes: string;
    public minimums: number;
    public employees?: Employee[] | undefined;

    constructor(other?: Shift) {
        this.id = (other && other.id) ? other.id : uuidv4();
        this.title = (other) ? other.title : "";
        this.display_order = (other) ? other.display_order : 0;
        this.shift_codes = (other && other.shift_codes) ? other.shift_codes : "";
        this.minimums = (other) ? other.minimums : 0;
        this.employees = new Array();
        if (other && other.employees) {
            for (let emp of other.employees) {
                this.employees.push(new Employee(emp));
            }
        }
    }

    getShiftCodes(): string[] {
        return this.shift_codes.split(",");
    }

    addShiftCode(code: string) {
        let codes = this.getShiftCodes();
        let found = false;
        for (let i=0; i < codes.length && !found; i++) {
            if (codes[i] === code) {
                found = true;
            }
        }
        if (!found) {
            codes.push(code);
        }
        this.shift_codes = "";
        codes.forEach(cd => {
            if (this.shift_codes !== "") {
                this.shift_codes += ",";
            }
            this.shift_codes += cd;
        });
    }

    addShiftCodes(aCodes: string[]) {
        let codes = this.getShiftCodes();
        aCodes.forEach(cd => {
            let found = false;
            for (let i=0; i < codes.length && !found; i++) {
                if (codes[i] === cd) {
                    found = true;
                }
            }
            if (!found) {
                codes.push(cd);
            }
        });
        this.shift_codes = "";
        codes.forEach(cd => {
            if (this.shift_codes !== "") {
                this.shift_codes += ",";
            }
            this.shift_codes += cd;
        });
    }

    removeShiftCode(code: string) {
        let codes = this.getShiftCodes();
        this.shift_codes = "";
        codes.forEach(cd => {
            if (cd !== code) {
                if (this.shift_codes !== "") {
                    this.shift_codes += ",";
                }
                this.shift_codes += cd;
            }
        });
    }

    compareTo(other: Shift): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }
}

export class Workcenter implements IComparable<Workcenter> {
    public id?: string | undefined;
    public title: string;
    public display_order: number;
    public positions?: Position[];
    public shifts?: Shift[];
    public employees?: Employee[];

    constructor(other?: Workcenter) {
        this.id = (other && other.id) ? other.id : uuidv4();
        this.title = (other) ? other.title : "";
        this.display_order = (other) ? other.display_order : 0;
        if (other && other.positions) {
            this.positions = [];
            for (let pos of other.positions) {
                if (this.positions) {
                    this.positions.push(new Position(pos));
                }
            }
        }
        if (other && other.shifts) {
            this.shifts = [];
            for (let shft of other.shifts) {
                if (this.shifts) {
                    this.shifts.push(new Shift(shft));
                }
            }
        }
        if (other && other.employees) {
            this.employees = [];
            for (let emp of other.employees) {
                if (this.employees) {
                    this.employees.push(new Employee(emp));
                }
            }
        }
    }

    compareTo(other: Workcenter): number {
        return (this.display_order < other.display_order) ? -1 : 1;
    }

    addShift(title: string, shiftCodes: string[], mins: number) {
        let order = 0;
        if (this.shifts) {
            for (let shft of this.shifts) {
                if (shft.display_order > order) {
                    order = shft.display_order;
                }
            }
        } else {
            this.shifts = [];
        }
        const s = new Shift();
        s.display_order = order + 1;
        s.minimums = mins;
        s.addShiftCodes(shiftCodes);
        s.title = title;
        this.shifts.push(s);
    }

    addPosition(title: string, display: boolean) {
        let order = 0;
        if (this.positions) {
            for (let pos of this.positions) {
                if (pos.display_order > order) {
                    order = pos.display_order;
                }
            }
        } else {
            this.positions = [];
        }
        const pos = new Position();
        pos.id = uuidv4();
        pos.title = title;
        pos.display_order = order + 1;
        pos.is_displayed = display;
        this.positions.push(pos);
    }
}