using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using timesheet.business;

namespace timesheet.api.controllers
{
    [Route("api/v1/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            this._taskService = taskService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var items = this._taskService.GetTasks();
            return new ObjectResult(items);
        }
    }
}