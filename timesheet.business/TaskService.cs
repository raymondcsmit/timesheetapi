using System;
using System.Linq;
using timesheet.data;
using timesheet.model;

namespace timesheet.business
{
    public interface ITaskService
    {
        IQueryable<Task> GetTasks();
    }
    public class TaskService : ITaskService
    {
        public TimesheetDb db { get; }//Instead of using context I will prefer repository
        public TaskService(TimesheetDb dbContext)
        {
            this.db = dbContext;
        }

        public IQueryable<Task> GetTasks()
        {
            try
            {
                return this.db.Tasks;
            }
            catch(Exception ex)
            {
                throw ex; //to log in middleware
            }
        }
    }
}
