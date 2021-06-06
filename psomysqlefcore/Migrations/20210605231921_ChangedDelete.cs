using Microsoft.EntityFrameworkCore.Migrations;

namespace psomysqlefcore.Migrations
{
    public partial class ChangedDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapFeature_FeatureType_FeatureTypeId",
                table: "MapFeature");

            migrationBuilder.AddForeignKey(
                name: "FK_MapFeature_FeatureType_FeatureTypeId",
                table: "MapFeature",
                column: "FeatureTypeId",
                principalTable: "FeatureType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapFeature_FeatureType_FeatureTypeId",
                table: "MapFeature");

            migrationBuilder.AddForeignKey(
                name: "FK_MapFeature_FeatureType_FeatureTypeId",
                table: "MapFeature",
                column: "FeatureTypeId",
                principalTable: "FeatureType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
