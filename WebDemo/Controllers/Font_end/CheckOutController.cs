using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class CheckOutController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Font-end/CheckOut/Index.cshtml");
        }
    }
}
