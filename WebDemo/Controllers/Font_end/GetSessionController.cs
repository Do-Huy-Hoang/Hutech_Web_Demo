using Microsoft.AspNetCore.Mvc;

namespace WebDemo.Controllers.Font_end
{
    public class GetSessionController : Controller
    {
        [HttpGet]
       public IActionResult getSe()
        {
            if (HttpContext.Session.GetString("Username") != null)
            {
                var id = HttpContext.Session.GetString("UserId");
                var name = HttpContext.Session.GetString("Username");
                var admin = HttpContext.Session.GetString("IsAdmin");
                var data = new
                {
                    id = id,
                    name = name,
                    admin = admin
                };
                if ((id != null || id != "") && (name != null || name != "") && (admin != null || admin != ""))
                {

                    var res = new
                    {
                        Success = true,
                        Data = data,
                    };
                    return Json(res);
                }
                else
                {
                    var res = new
                    {
                        Success = false,
                    };
                    return Json(res);
                }
            }
            else
            {
                var res = new
                {
                    Success = false,
                };
                return Json(res);
            }
        }
    }
}
