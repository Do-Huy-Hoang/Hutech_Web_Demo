using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string? UserPhoneNumber { get; set; }

    public string? UserAddress { get; set; }

    public bool IsAdmin { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<Order> Orders { get; } = new List<Order>();

    public virtual ICollection<Role> Roles { get; } = new List<Role>();
}
