export enum WorkingDays {
   
    Monday ,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday ,
    Sunday   
}
export class TimeSheet
{
    TimeSheetID:number;
    EmployeeID:number;
    TaskID:number;
    Hours:number;
    Day:number;
    DateOfDay:Date;
    FkEmployee:any;
    FkTask:any;

}
export class Field
{
    TimeSheetID:number;
    Hours:number;
    Day:number;
}
export class RowRecord
{
    TaskID:number;
    row:Field[]=[];
    constructor() {
        
        var x = WorkingDays;
        var options = Object.keys(WorkingDays);
        options = options.slice(options.length / 2);
        for (let i = 1; i <= options.length; i++) {
            let daytask=new Field();
            daytask.Day=i;
            daytask.Hours=0;
            this.row.push(daytask);
}
        
    }}