import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
    selector: 'employee-list',
    templateUrl: 'employee.component.html',
    styleUrls:['./employee.component.scss']
})

export class EmployeeListComponent implements OnInit {
    employees: any=[];
    constructor(private employeeService: EmployeeService) { }

    ngOnInit() {
        this.employeeService.getallemployees().subscribe(data => {
            let dbdata= <any[]>data;
            for(let item of dbdata)
            {
                let emp:any={};
                emp.id =item.id;
                emp.code =item.code;
                emp.name =item.name;
                emp.total=0;
                emp.average=0;
                if(item.timeSheetList.length>0)
                {
                    for (var i = 0; i < item.timeSheetList.length; i++) {
                        emp.total += item.timeSheetList[i].hours;
                      }
               
                emp.average=emp.total/item.timeSheetList.length;
                }
               
                this.employees.push(emp);
            }
            console.log(this.employees);
            console.log(data);
        });
    }
}