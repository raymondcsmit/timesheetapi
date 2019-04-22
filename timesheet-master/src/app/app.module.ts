import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { TaskService } from './services/task.service';
import { TimeSheetService } from './services/timesheet.service';
import { DayEnumToArrayPipe, FilterPipe } from './pipe/dayenumtoarray';
import { RouterModule, Routes } from '@angular/router';
import {
  CalendarModule
  
  } from 'primeng/primeng';
import { RequestInterceptor } from './services/requestInterceptor';
import { TimesheetComponent } from './timesheet/timesheet.component';
const appRoute: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'timesheet', component: TimesheetComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,FilterPipe,
    DayEnumToArrayPipe, TimesheetComponent
  ],
  imports: [
    BrowserModule,CalendarModule,BrowserAnimationsModule,
    HttpClientModule, FormsModule,ReactiveFormsModule,RouterModule.forRoot(appRoute)
  ],
  providers: [
    EmployeeService,TaskService,TimeSheetService,{
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
// as working in angular6 and using primeng which required rxjs-compat so I install it.