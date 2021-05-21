using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace psomysqlefcore.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FeatureType",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeatureType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MapFeature",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    XCoord = table.Column<float>(type: "float", nullable: false),
                    YCoord = table.Column<float>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    FeatureTypeId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapFeature", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapFeature_FeatureType_FeatureTypeId",
                        column: x => x.FeatureTypeId,
                        principalTable: "FeatureType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "FeatureType",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1L, "asdlf" });

            migrationBuilder.CreateIndex(
                name: "IX_MapFeature_FeatureTypeId",
                table: "MapFeature",
                column: "FeatureTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MapFeature");

            migrationBuilder.DropTable(
                name: "FeatureType");
        }
    }
}
