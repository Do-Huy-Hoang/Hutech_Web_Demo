using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers
{
    public class ProductDetailsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
