using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebDemo.Models;

public partial class WebDemoContext : DbContext
{
    public WebDemoContext()
    {
    }

    public WebDemoContext(DbContextOptions<WebDemoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductImg> ProductImgs { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=localhost; Initial Catalog=WebDemo; user id=vinh; password=123;Encrypt=false;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CateId).HasName("PK__Category__34EAD17332EF90C3");

            entity.ToTable("Category");

            entity.Property(e => e.CateId).HasColumnName("cate_id");
            entity.Property(e => e.CateName)
                .HasMaxLength(150)
                .HasColumnName("cate_name");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.IsDelete).HasColumnName("isDelete");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("datetime")
                .HasColumnName("updateAt");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrdId).HasName("PK__Order__DC39D7DF2AC524A6");

            entity.ToTable("Order");

            entity.Property(e => e.OrdId)
                .ValueGeneratedNever()
                .HasColumnName("ord_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.OrdAddress)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("ord_address");
            entity.Property(e => e.OrdEmail)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("ord_email");
            entity.Property(e => e.OrdName)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("ord_name");
            entity.Property(e => e.OrdPhoneNumber)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("ord_phoneNumber");
            entity.Property(e => e.OrdUserId).HasColumnName("ord_userId");

            entity.HasOne(d => d.OrdUser).WithMany(p => p.Orders)
                .HasForeignKey(d => d.OrdUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Order_User_ord_userId");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrdDetailId).HasName("PK__Order_de__B52E32E56DFF5396");

            entity.ToTable("Order_detail");

            entity.Property(e => e.OrdDetailId).HasColumnName("ordDetail_id");
            entity.Property(e => e.OrdDetailOrder).HasColumnName("ordDetail_Order");
            entity.Property(e => e.OrdDetailProduct).HasColumnName("ordDetail_Product");
            entity.Property(e => e.OrdDetailQuantity).HasColumnName("ordDetail_Quantity");

            entity.HasOne(d => d.OrdDetailOrderNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrdDetailOrder)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Order_detail_Order_ordDetail_Order");

            entity.HasOne(d => d.OrdDetailProductNavigation).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrdDetailProduct)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Order_detail_Product_ordDetail_Product");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProId).HasName("PK__Product__335E4CA6BA949698");

            entity.ToTable("Product");

            entity.Property(e => e.ProId).HasColumnName("pro_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.IsDelete).HasColumnName("isDelete");
            entity.Property(e => e.ProCategory).HasColumnName("pro_Category");
            entity.Property(e => e.ProDescription)
                .HasColumnType("text")
                .HasColumnName("pro_description");
            entity.Property(e => e.ProImg)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("pro_img");
            entity.Property(e => e.ProName)
                .HasMaxLength(150)
                .HasColumnName("pro_name");
            entity.Property(e => e.ProPrice)
                .HasMaxLength(150)
                .HasColumnName("pro_price");
            entity.Property(e => e.ProQuantity).HasColumnName("pro_quantity");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("datetime")
                .HasColumnName("updateAt");

            entity.HasOne(d => d.ProCategoryNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.ProCategory)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Product_Category_pro_Category");
        });

        modelBuilder.Entity<ProductImg>(entity =>
        {
            entity.HasKey(e => e.ProImgId).HasName("PK__Product___40A564A41C1E7635");

            entity.ToTable("Product_img");

            entity.Property(e => e.ProImgId).HasColumnName("proImg_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.ProImgPath)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("proImg_path");
            entity.Property(e => e.ProImgProduct).HasColumnName("proImg_Product");

            entity.HasOne(d => d.ProImgProductNavigation).WithMany(p => p.ProductImgs)
                .HasForeignKey(d => d.ProImgProduct)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Product_img_Product_proImg_Product");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__B9BE370F7405CD01");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CreateAt)
                .HasColumnType("datetime")
                .HasColumnName("createAt");
            entity.Property(e => e.IsAdmin).HasColumnName("isAdmin");
            entity.Property(e => e.UpdateAt)
                .HasColumnType("datetime")
                .HasColumnName("updateAt");
            entity.Property(e => e.UserAddress)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("user_address");
            entity.Property(e => e.UserEmail)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("user_email");
            entity.Property(e => e.UserName)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("user_name");
            entity.Property(e => e.UserPassword)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("user_password");
            entity.Property(e => e.UserPhoneNumber)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("user_phoneNumber");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
