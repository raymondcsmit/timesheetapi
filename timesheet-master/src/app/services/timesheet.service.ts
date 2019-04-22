import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TimeSheet } from '../timesheet/model';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
@Injectable()
export class TimeSheetService {
    private baseapi = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getemployeetimesheet(empid,startdate,enddate) {
        let params = new HttpParams();
params = params.append('employeeid', empid);
params = params.append('start',startdate.toISOString());
params = params.append('end', enddate.toISOString());
        return this.http.get(this.baseapi + "/timesheet/getemployeetimesheetbyweek",{params: params});
    }
    add(data: TimeSheet): Observable<TimeSheet>  {
        return this.http.post<TimeSheet>(this.baseapi + "/timesheet/add", data);
    }
    addrange(data: TimeSheet[]): Observable<TimeSheet[]>  {
        return this.http.post<TimeSheet[]>(this.baseapi + "/timesheet/addrange", data);
    }
}