using Microsoft.EntityFrameworkCore.Migrations;

namespace psomysqlefcore.Migrations
{
    public partial class RenamedColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "yCoord",
                table: "MapFeature",
                newName: "YCoord");

            migrationBuilder.RenameColumn(
                name: "xCoord",
                table: "MapFeature",
                newName: "XCoord");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "MapFeature",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YCoord",
                table: "MapFeature",
                newName: "yCoord");

            migrationBuilder.RenameColumn(
                name: "XCoord",
                table: "MapFeature",
                newName: "xCoord");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "MapFeature",
                newName: "description");
        }
    }
}
