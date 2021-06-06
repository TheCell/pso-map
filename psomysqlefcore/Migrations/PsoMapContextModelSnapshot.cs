﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using psomysqlefcore;

namespace psomysqlefcore.Migrations
{
    [DbContext(typeof(PsoMapContext))]
    partial class PsoMapContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("psomysqlefcore.model.Entities.FeatureType", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Color")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("FeatureType");
                });

            modelBuilder.Entity("psomysqlefcore.model.Entities.MapFeature", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long>("FeatureTypeId")
                        .HasColumnType("bigint");

                    b.Property<float>("XCoord")
                        .HasColumnType("float");

                    b.Property<float>("YCoord")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("FeatureTypeId");

                    b.ToTable("MapFeature");
                });

            modelBuilder.Entity("psomysqlefcore.model.Entities.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<int>("UserRights")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("psomysqlefcore.model.Entities.MapFeature", b =>
                {
                    b.HasOne("psomysqlefcore.model.Entities.FeatureType", "FeatureType")
                        .WithMany("MapFeatures")
                        .HasForeignKey("FeatureTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("FeatureType");
                });

            modelBuilder.Entity("psomysqlefcore.model.Entities.FeatureType", b =>
                {
                    b.Navigation("MapFeatures");
                });
#pragma warning restore 612, 618
        }
    }
}
