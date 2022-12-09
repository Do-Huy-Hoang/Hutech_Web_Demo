using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class CartController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
