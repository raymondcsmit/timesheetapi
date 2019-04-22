import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  public headers: HttpHeaders;
  constructor( private router: Router) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
      request = request.clone({
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {       
        if (event instanceof HttpResponse && event.status === 201) {
          console.log(event);//this.toastr.success("Object created.");
        }
      },
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(this.handleError(err));
        }
      })
    );
    
  }
  private handleError(err: HttpErrorResponse): any {
    let message: string;
    message = "error status:" + err.status;
    message += " ";
    message += "error message:" + err.message;
    return message;
  }
}
