using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class ProductImg
{
    public int ProImgId { get; set; }

    public string ProImgPath { get; set; } = null!;

    public int ProImgProduct { get; set; }

    public DateTime? CreateAt { get; set; }

    public virtual Product ProImgProductNavigation { get; set; } = null!;
}
