using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class ProductDetailController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
