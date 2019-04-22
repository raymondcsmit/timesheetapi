using Microsoft.EntityFrameworkCore.Migrations;

namespace timesheet.data.Migrations
{
    public partial class task_seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO Tasks Values('Sick Leave', 'Apply this task on sick leave.')
                INSERT INTO Tasks Values('Scrum Ceremonies', 'Scrum meetings, standup, sprint plannig, grooming etc.')
                INSERT INTO Tasks Values('Internal Meeting', 'Meetings Meetings.')
                INSERT INTO Tasks Values('Development', 'Development tasks, features, change requets.')
                INSERT INTO Tasks Values('Bug Fixes', 'You know what it means.')
                  GO  ");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
