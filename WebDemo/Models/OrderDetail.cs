using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class OrderDetail
{
    public int OrdDetailId { get; set; }

    public int OrdDetailOrder { get; set; }

    public int OrdDetailProduct { get; set; }

    public int OrdDetailQuantity { get; set; }

    public virtual Order OrdDetailOrderNavigation { get; set; } = null!;

    public virtual Product OrdDetailProductNavigation { get; set; } = null!;
}
