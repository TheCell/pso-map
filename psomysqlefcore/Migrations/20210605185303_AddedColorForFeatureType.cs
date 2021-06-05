using Microsoft.EntityFrameworkCore.Migrations;

namespace psomysqlefcore.Migrations
{
    public partial class AddedColorForFeatureType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "FeatureType",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "FeatureType");
        }
    }
}
