using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class Category
{
    public int CateId { get; set; }

    public string CateName { get; set; } = null!;

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public bool? IsDelete { get; set; }

    public virtual ICollection<Product> Products { get; } = new List<Product>();
}
