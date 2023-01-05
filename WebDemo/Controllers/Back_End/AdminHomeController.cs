using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Back_End
{
    public class AdminHomeController : Controller
    {
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("IsAdmin") != null && (HttpContext.Session.GetString("IsAdmin").Equals("True")))
            {
                return View("Views/Back-end/AdminHome/index.cshtml");
            }
            else
            {
                return Redirect("/404");
            }
        }
    }
}
