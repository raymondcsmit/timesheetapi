using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace timesheet.model
{
    public class TimeSheet
    {
        public int TimeSheetID { get; set; }
        [ForeignKey("FkEmployee")]
        public int EmployeeID { get; set; }
        public Employee FkEmployee { get; set; }
        [ForeignKey("FkTask")]
        public int TaskID { get; set; }
        public Task FkTask { get; set; }
        public int Hours { get; set; }
        public int Day { get; set; }
        public DateTime DateOfDay { get; set; }
        


    }
}
