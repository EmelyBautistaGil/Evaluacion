using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class INITAL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Asignaciones",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AsignacionNo = table.Column<int>(type: "int", nullable: false),
                    EdificioNumero = table.Column<int>(type: "int", nullable: false),
                    TrabajadorNumero = table.Column<int>(type: "int", nullable: false),
                    AsignacionFechaInicio = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    AsignacionNoDias = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asignaciones", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Edificios",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EdificioNumero = table.Column<int>(type: "int", nullable: false),
                    EdificioDireccion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TipoEdificio = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NivelCalidad = table.Column<int>(type: "int", nullable: false),
                    Categoria = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edificios", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Trabajadores",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrabajadorNumero = table.Column<int>(type: "int", nullable: false),
                    TrabajadorNombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TrabajadorTarifa = table.Column<float>(type: "real", nullable: false),
                    Oficio = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TrabajadorSupervisor = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trabajadores", x => x.ID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asignaciones");

            migrationBuilder.DropTable(
                name: "Edificios");

            migrationBuilder.DropTable(
                name: "Trabajadores");
        }
    }
}
