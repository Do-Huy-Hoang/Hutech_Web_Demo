using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Font_end
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Font-end/about/Index.cshtml");
        }
    }
}
