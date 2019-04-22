using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using timesheet.business;
using timesheet.model;

namespace timesheet.api.controllers
{
    [Route("api/v1/timesheet")]
    [ApiController]
    public class TimeSheetController : ControllerBase
    {
        private readonly ITimeSheetService _timesheetService;
        public TimeSheetController(ITimeSheetService timesheetService)
        {
            this._timesheetService = timesheetService;
        }

        [HttpGet("getemployeetimesheet")]
        public IActionResult GetEmployeeTimeSheet(int EmployeeID)
        {
            var items = this._timesheetService.GetTimeSheet(EmployeeID);
            return new ObjectResult(items);
        }
        [HttpGet("getemployeetimesheetbyweek")]
        public IActionResult GetEmployeeTimeSheetByWeek(int EmployeeID,DateTime Start, DateTime End)
        {
            var items = this._timesheetService.GetTimeSheetByWeek(EmployeeID,Start, End);
            return new ObjectResult(items);
        }
        [HttpPost("addrange")]
        public IActionResult CreateRange([FromBody]TimeSheet[] listTimeSheet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            this._timesheetService.AddRange(listTimeSheet);

            return Ok(listTimeSheet);
        }
    }
}