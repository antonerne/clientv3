import { IComparable } from "../utilities/comparable";

export class WorkCode implements IComparable<WorkCode> {
    public id?: string | undefined;
    public code: string;
    public starttime?: number | undefined;
    public shift_pay_code?: number | undefined;

    constructor(other?: WorkCode) {
        this.id = (other && other.id) ? other.id : undefined;
        this.code = (other) ? other.code : "";
        this.starttime = (other && other.starttime) ? other.starttime : 8;
        this.shift_pay_code = (other && other.shift_pay_code) 
            ? other.shift_pay_code : 0;
    }

    compareTo(other: WorkCode): number {
        return (this.code < other.code) ? -1 : 1;
    }
}