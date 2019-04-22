using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using timesheet.data;
using timesheet.model;

namespace timesheet.business
{
    public interface IEmployeeService
    {
        IQueryable<Employee> GetEmployees();
    }
    public class EmployeeService: IEmployeeService
    {
        public TimesheetDb db { get; }
        public EmployeeService(TimesheetDb dbContext)
        {
            this.db = dbContext;
        }

        public IQueryable<Employee> GetEmployees()
        {
            try { 
            return this.db.Employees.Include(c=>c.TimeSheetList);
            }
            catch (Exception ex)
            {
                throw ex; //to log in middleware
            }
        }
    }
}
