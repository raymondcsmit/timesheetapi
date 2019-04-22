using Microsoft.EntityFrameworkCore.Migrations;

namespace timesheet.data.Migrations
{
    public partial class employee_seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                INSERT INTO Employees Values('68319', 'KAYLING')
                INSERT INTO Employees Values('66928', 'BLAZE')
                INSERT INTO Employees Values('67832', 'CLARE')
                INSERT INTO Employees Values('69062', 'JONAS')
                INSERT INTO Employees Values('63679', 'SCARLET')
                INSERT INTO Employees Values('64989', 'FRANK')
                INSERT INTO Employees Values('65271', 'SANDRINE')
                INSERT INTO Employees Values('66564', 'ADELYN')
                INSERT INTO Employees Values('68454', 'WADE')
                INSERT INTO Employees Values('69000', 'MADDEN')
                  GO  ");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
