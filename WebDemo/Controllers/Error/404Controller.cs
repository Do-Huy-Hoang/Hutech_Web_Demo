using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Error
{
    public class _404Controller : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Error/404.cshtml");
        }
    }
}
