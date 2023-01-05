using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Font-end/Order/Index.cshtml");
        }
    }
}
