import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';
import { TimeSheetService } from '../services/timesheet.service';
import { WorkingDays, TimeSheet } from '../timesheet/model';
import { SELECT_VALUE_ACCESSOR } from '@angular/forms/src/directives/select_control_value_accessor';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  wdays=WorkingDays;
  timesheetForm: FormGroup;
    submitted = false;
    employees:any;
    listTasks:any;// I will prefer type here instead of using any, but follow the pattern defined in employee component for consistency
    constructor(private formBuilder: FormBuilder,
      private router: Router,
      private employeeService: EmployeeService,
      private taskService: TaskService,
      private timesheetService: TimeSheetService) { }
dateT:any;
    ngOnInit() {


      this.timesheetForm = new FormGroup({
        
        selectedEmployee: new FormControl(null,Validators.required),
        startDate:new FormControl(null,Validators.required),        
        endDate:new FormControl(null,Validators.required),        
        date:new FormControl(null,Validators.required), 
       records : new FormArray([
         // this.initRecord(),
        ]),
        total:new FormArray([]),//this.initSum()
        average:new FormArray([]),//[this.initAvg()]
      });
      this.setAvgFieldss();
      this.setSumFieldss();
     
      this.setSubscription();

      this.employeeService.getallemployees().subscribe(data => {
        this.employees = data;
      });
      this.taskService.getalltasks().subscribe(data => {
        this.listTasks = data;
    });
    }
    onChanges(): void {
      

      
    }
    setSubscription()
    {
      this.timesheetForm.controls['date'].valueChanges.subscribe(() => {
        if (this.timesheetForm.controls['date'].value !=null) {
          let start = new Date(this.timesheetForm.controls['date'].value);
          start.setDate(start.getDate() - start.getDay()); 
          let end = new Date(start);
          end.setDate(start.getDate() + 6); 
          let dateV=[]; 
          dateV[0]=start;
          dateV[1]=end;
          //this.timesheetForm.controls['date'].setValue(start);
          this.timesheetForm.patchValue({startDate:start, endDate:end});
         // console.log(start);
        }
      });
      this.timesheetForm.controls['records'].valueChanges.subscribe(() => {
        let data=this.timesheetForm.value.records;
        if(data.length>0){
        var x = WorkingDays;
      var options = Object.keys(WorkingDays);
      options = options.slice(options.length / 2);
      let controltotal = <FormArray>this.timesheetForm.get('total');
      let controlaverage = <FormArray>this.timesheetForm.get('average');
      for (let i = 0; i < options.length; i++) {
       
        let sumval=0;
        for(let row of data)
        {
         
          if(row.taskdetail.find(c=>c.day==i))
          sumval=sumval+Number(row.taskdetail.find(c=>c.day==i).hours);
        }

       //let sumval= data.filter(c=>c.day==i) .reduce((sum, current) => sum + current.hours, 0);
          let avgval=sumval/data.length;
          controltotal.at(i).patchValue({sum:sumval});
          controlaverage.at(i).patchValue({avg:avgval});
        }
      }
      });
    
    }
   save():void{
     console.log(this.timesheetForm.value);
let data=this.timesheetForm.value;
     let timesheetentries:TimeSheet[]=[];
     for(let record of data.records)
     {
       for(let field of record.taskdetail)
       {
         if(field.Hours!=0)
         {
           let timesheetDate = new Date(data.startDate);
           timesheetDate.setDate(timesheetDate.getDate() + field.day); 
           let timesheetent=new TimeSheet();
           timesheetent.TaskID=record.task;
           timesheetent.Day=field.day;
           timesheetent.DateOfDay= timesheetDate;
           timesheetent.Hours=field.hours;
           timesheetent.EmployeeID=data.selectedEmployee;
           timesheetent.TimeSheetID=field.timesheetid;
           timesheetentries.push(timesheetent);
         }
       }
     }
     if(timesheetentries.length>0)
    {
    this.timesheetService.addrange(timesheetentries).subscribe(res => {
      this.settimesheetrecord(res);
      //  let value=this.setValue(res); 
      //  this.timesheetForm.reset(value);
      },
    error => {console.log('record not be saved');console.log(error);}); 
    }
//use console.log for notification purpose. Can't add toasterservice due to time constraint


   }
   onrecordChange()
   {
    if(this.timesheetForm.valid)
     {this. loademployeetimesheet();}
   }
   backtoemployee(){this.router.navigate(['/employees']);}
   loademployeetimesheet()
   {
     if(this.timesheetForm.valid)
     {
       this.timesheetService.getemployeetimesheet(this.timesheetForm.value.selectedEmployee,this.timesheetForm.value.startDate,this.timesheetForm.value.endDate)
       .subscribe(res => { 
         
       this.settimesheetrecord(res);
        
       },
       error => {console.log('record not be saved');console.log(error);}); 
     }
   }
   settimesheetrecord(data:any)
   {
   
    let controllist = <FormArray>this.timesheetForm.get('records');
    for (let i = 0; i < controllist.length; i++) {
    
      controllist.removeAt(i);

    }
    let recordsList=[];

    
    for(let val of data)
    {
      
      let rec=recordsList.find(c=>c.task==val.taskID);
      if(rec==null)
      {
        let obj:any={};
        obj.task=val.taskID;
        obj.taskdetail=[];
        
        recordsList.push(obj);
        rec=obj;
      }
      let task:any={};
        task.day=val.day;
        task.hours=val.hours;
        task.timesheetid=val.timeSheetID;

        rec.taskdetail.push(task);
        
    }
  
    recordsList.forEach(x => {
      this.insertRecords(x);
    });
   }  


    initTaskDetail() {
      
      return new FormGroup({
        timesheetid: new FormControl(null),
        hours: new FormControl('',Validators.required),
        day: new FormControl('')
      });
    }
    getRecords(form) {
     
      return form.controls.records.controls;
    }
    addRecords() {
      const control = <FormArray>this.timesheetForm.get('records');
      let val=this.initRecord();
      let tdetail = <FormArray>val.get('taskdetail');
      var x = WorkingDays;
      var options = Object.keys(WorkingDays);
      options = options.slice(options.length / 2);
      for (let i = 1; i <= options.length; i++) {
        let rec=this.initTaskDetail();
        rec.setValue({hours:0,day:i,timesheetid:0 });
        tdetail.push(rec);
      }
      control.push(val);      

    }
    insertRecords(record:any) {
      const control = <FormArray>this.timesheetForm.get('records');
      let val=this.initRecord();
      
      let tdetail = <FormArray>val.get('taskdetail');
      record.taskdetail.forEach(x=>{
        let rec=this.initTaskDetail();
        rec.setValue({hours:x.hours,day:x.day,timesheetid:x.timesheetid });
        tdetail.push(rec);
      });
      val.patchValue({task:record.task});
      val.setControl('taskdetail',tdetail);
      //val.setValue({task:record.task, taskdetail:tdetail});
      //val.patchValue({task:record.task, taskdetail:tdetail});
      control.push(val);      

    }
    initRecord() {
      return new FormGroup({
        task: new FormControl(null,Validators.required),
        taskdetail: new FormArray([])
      });
    }
    setSumFieldss() {
      const control = <FormArray>this.timesheetForm.get('total');
      var options = Object.keys(WorkingDays);
      options = options.slice(options.length / 2);
      for (let i = 1; i <= options.length; i++) {
      let val=this.initSum();
      control.push(val);
      }
      
    }

    initSum()
    {
let sumArray=new FormArray([]);

        return new FormGroup({
          sum: new FormControl(null),//todo disable these fields
          day:new FormControl(null)
        });
        
      
    }
    setAvgFieldss() {
      const control = <FormArray>this.timesheetForm.get('average');
      var options = Object.keys(WorkingDays);
      options = options.slice(options.length / 2);
      for (let i = 1; i <= options.length; i++) {
      let val=this.initAvg();
      control.push(val);
      }
      
    }
    initAvg()
    {
      return new FormGroup({
                avg: new FormControl(null),//todo disable these fields
                day:new FormControl(null)
              });

    }
    getRecordfields(form) {
      //console.log(form.get('options').controls);
      return form.controls.taskdetail.controls;
  
    }
    getSumfields(form) {
      //console.log(form.get('options').controls);
      return form.controls.total.controls;
  
    }
    getAvgfields(form) {
      //console.log(form.get('options').controls);
      return form.controls.average.controls;
  
    }
    validate(){
if(!this.timesheetForm.valid)
{
console.log("not valid");
}

    }
}
