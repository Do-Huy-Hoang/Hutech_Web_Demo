using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Font_end
{
    public class ShoppingCartController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Font-end/ShoppingCart/Index.cshtml");
        }
    }
}
