using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class Order
{
    public int OrdId { get; set; }

    public int OrdUserId { get; set; }

    public string OrdName { get; set; } = null!;

    public string OrdEmail { get; set; } = null!;

    public string OrdPhoneNumber { get; set; } = null!;

    public string? OrdAddress { get; set; }

    public DateTime? CreateAt { get; set; }

    public virtual User OrdUser { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; } = new List<OrderDetail>();
}
