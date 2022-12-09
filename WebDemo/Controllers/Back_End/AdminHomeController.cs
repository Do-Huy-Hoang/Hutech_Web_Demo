using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Back_End
{
    public class AdminHomeController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Back-end/AdminHome/index.cshtml");
        }
    }
}
