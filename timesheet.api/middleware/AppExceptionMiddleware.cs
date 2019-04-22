using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace timesheet.api.middleware
{
    public class AppExceptionMiddleware
    {
        private readonly RequestDelegate next;
        //private IEntityBaseRepository<ErrorDetails> ErrorDetailsRepository;
        public AppExceptionMiddleware(RequestDelegate next)
        {
            this.next = next;
            //  this.ErrorDetailsRepository = _ErrorDetailsRepository;
        }

        public async Task Invoke(HttpContext context)
        {
           
            try
            {

                ErrorDetails result = null;
                var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;
                //when authorization has failed, should retrun a json message to client
                if (error != null && error.Error != null)
                {
                    context.Response.StatusCode = 500;
                    context.Response.ContentType = "application/json";
                    result = new ErrorDetails() { Message = "Request failed", StatusCode = (int)context.Response.StatusCode, ErrorDate = DateTime.Now };

                   

                    //todo log exception
                    //this.ErrorDetailsRepository.Add(result);
                    //this.ErrorDetailsRepository.Commit();
                }
                //when no error, do next.
                else await next(context);

            }
            catch (HttpStatusCodeException ex)
            {
                //todo log exception
                //this.ErrorDetailsRepository.Add(HandleExceptionAsync(context, ex));
                //this.ErrorDetailsRepository.Commit();

            }
            catch (System.Exception exceptionObj)
            {
                //todo log exception
                //this.ErrorDetailsRepository.Add(HandleExceptionAsync(context, exceptionObj));
                //this.ErrorDetailsRepository.Commit();

            }
        }



        private ErrorDetails HandleExceptionAsync(HttpContext context, HttpStatusCodeException exception)
        {
            ErrorDetails result = null;
            context.Response.ContentType = "application/json";




            if (exception is HttpStatusCodeException)
            {
                result = new ErrorDetails() { Message = exception.Message, StatusCode = (int)exception.StatusCode, ErrorDate = DateTime.Now };

                context.Response.StatusCode = (int)exception.StatusCode;
            }
            else
            {
                result = new ErrorDetails() { Message = "Runtime Error", StatusCode = (int)HttpStatusCode.BadRequest, ErrorDate = DateTime.Now };
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            }


            return result;
        }

        private ErrorDetails HandleExceptionAsync(HttpContext context, System.Exception exception)
        {

            ErrorDetails result = new ErrorDetails() { Message = exception.Message, StatusCode = (int)HttpStatusCode.InternalServerError, ErrorDate = DateTime.Now };
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return result;
        }

    }
    public class HttpStatusCodeException : System.Exception
    {
        public HttpStatusCode StatusCode { get; set; }
        public string ContentType { get; set; } = @"text/plain";

        public HttpStatusCodeException(HttpStatusCode statusCode)
        {
            this.StatusCode = statusCode;
        }

        public HttpStatusCodeException(HttpStatusCode statusCode, string message) : base(message)
        {
            this.StatusCode = statusCode;
        }

        public HttpStatusCodeException(HttpStatusCode statusCode, System.Exception inner) : this(statusCode, inner.ToString()) { }

        public HttpStatusCodeException(HttpStatusCode statusCode, JObject errorObject) : this(statusCode, errorObject.ToString())
        {
            this.ContentType = @"application/json";
        }

    }
    public class ErrorDetails 
    {
        public DateTime ErrorDate { get; set; }
        public long ErrorID { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }


    }
}
