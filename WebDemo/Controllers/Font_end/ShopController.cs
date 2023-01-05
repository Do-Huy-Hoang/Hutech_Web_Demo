using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Font_end
{
    public class ShopController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Font-end/Shop/Index.cshtml");
        }
    }
}
