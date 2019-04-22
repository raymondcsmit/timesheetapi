using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace timesheet.api.middleware
{
    public static class MiddlewareExtensions
    {
        //public static IApplicationBuilder UseAppLoggingMiddleware(
        //    this IApplicationBuilder builder)
        //{
        //    return builder.UseMiddleware<AppLoggingMiddleware>();
        //}
        public static IApplicationBuilder UseAppExceptionMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AppExceptionMiddleware>();
        }
    }
}
