using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class ShopController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
