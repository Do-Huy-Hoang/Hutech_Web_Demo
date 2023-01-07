using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class Product
{
    public int ProId { get; set; }

    public string ProName { get; set; } = null!;

    public string ProPrice { get; set; } = null!;

    public int ProQuantity { get; set; }

    public string ProDescription { get; set; } = null!;

    public string ProImg { get; set; } = null!;

    public int ProCategory { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public bool? IsDelete { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; } = new List<OrderDetail>();

    public virtual Category ProCategoryNavigation { get; set; } = null!;

    public virtual ICollection<ProductImg> ProductImgs { get; } = new List<ProductImg>();
}
