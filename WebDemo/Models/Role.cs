using System;
using System.Collections.Generic;

namespace WebDemo.Models;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public int RoleUser { get; set; }

    public virtual User RoleUserNavigation { get; set; } = null!;
}
