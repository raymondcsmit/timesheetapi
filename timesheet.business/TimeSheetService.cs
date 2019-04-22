using System;
using System.Collections.Generic;
using System.Linq;
using timesheet.data;
using timesheet.model;

namespace timesheet.business
{
    public interface ITimeSheetService
    {
        IQueryable<TimeSheet> GetTimeSheet(int EmployeeID);
        IQueryable<TimeSheet> GetTimeSheetByWeek(int EmployeeID, DateTime Start, DateTime End);
        void AddRange(TimeSheet[] listTimeSheet);
    }
    public class TimeSheetService : ITimeSheetService
    {
        public TimesheetDb db { get; }//Instead of using context I will prefer repository
        public TimeSheetService(TimesheetDb dbContext)
        {
            this.db = dbContext;
        }

        public IQueryable<TimeSheet> GetTimeSheet(int EmployeeID)
        {
            try
            {
                return this.db.TimeSheets.Where(c => c.EmployeeID == EmployeeID);
            }
            catch (Exception ex)
            {
                throw ex; //to log in middleware
            }
        }
        public IQueryable<TimeSheet> GetTimeSheetByWeek(int EmployeeID, DateTime Start, DateTime End)
        {
            try
            {
                return this.db.TimeSheets.Where(c => c.EmployeeID == EmployeeID && c.DateOfDay >= Start && c.DateOfDay <= End);
            }
            catch (Exception ex)
            {
                throw ex; //to log in middleware
            }
        }
        private void UpdateRange(List<TimeSheet> listTimeSheet)
        {
            foreach(TimeSheet obj in listTimeSheet)
            {
                var entity = this.db.TimeSheets.FirstOrDefault(c => c.TimeSheetID == obj.TimeSheetID);

                // Validate entity is not null
                if (entity != null)
                {
                    entity.Hours = obj.Hours;
                    entity.TaskID = obj.TaskID;
                    this.db.TimeSheets.Update(entity);
                }


                
            }
        }
        public void AddRange(TimeSheet[] listTimeSheet)
        {
            try
            {
                this.db.TimeSheets.AddRange(listTimeSheet.Where(c=>c.TimeSheetID==0));
                this.UpdateRange(listTimeSheet.Where(c => c.TimeSheetID > 0).ToList());
                this.db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex; //to log in middleware
            }
        }

      
    }
}
