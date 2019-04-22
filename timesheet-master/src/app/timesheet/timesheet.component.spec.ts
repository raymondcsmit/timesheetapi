import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { DayEnumToArrayPipe } from '../pipe/dayenumtoarray';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeService } from '../services/employee.service';
import { TaskService } from '../services/task.service';
import { TimeSheetService } from '../services/timesheet.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from '../services/requestInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,CalendarModule,RouterTestingModule,HttpClientModule,BrowserAnimationsModule],
      declarations: [ TimesheetComponent,DayEnumToArrayPipe, ],
      providers:[EmployeeService,TaskService,TimeSheetService,{
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
      },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
