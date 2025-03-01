using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace GrpcService.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "curso",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "text", nullable: false),
                    estado = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("curso_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "estudiante",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nombre = table.Column<string>(type: "text", nullable: false),
                    apellido = table.Column<string>(type: "text", nullable: false),
                    direccion = table.Column<string>(type: "text", nullable: true),
                    estado = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("estudiante_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "estudiante_curso",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    estudianteId = table.Column<int>(type: "integer", nullable: false),
                    cursoId = table.Column<int>(type: "integer", nullable: false),
                    estado = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("estudiante_curso_pkey", x => x.id);
                    table.ForeignKey(
                        name: "FK_estudiante_curso_curso_cursoId",
                        column: x => x.cursoId,
                        principalTable: "curso",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_estudiante_curso_estudiante_estudianteId",
                        column: x => x.estudianteId,
                        principalTable: "estudiante",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_estudiante_curso_cursoId",
                table: "estudiante_curso",
                column: "cursoId");

            migrationBuilder.CreateIndex(
                name: "IX_estudiante_curso_estudianteId",
                table: "estudiante_curso",
                column: "estudianteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "estudiante_curso");

            migrationBuilder.DropTable(
                name: "curso");

            migrationBuilder.DropTable(
                name: "estudiante");
        }
    }
}
