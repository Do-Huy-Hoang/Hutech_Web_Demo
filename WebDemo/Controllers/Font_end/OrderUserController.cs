using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebDemo.Models;

namespace WebDemo.Controllers.Font_end
{
    public class OrderUserController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                return View("Views/Font-end/Order/index.cshtml");
            }
            else
            {
                return View("Views/Font-end/Login/Login.cshtml");
            }            
        }

        [HttpGet]
        public IActionResult get_data_order_user(int Page, int Size, string orderName)
        {
            var data = getOrderUser(Page, Size, orderName);
            if (data != null)
            {
                var res = new
                {
                    Success = true,
                    Message = "",
                    Data = data
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Loi Xay Ra"
                };
                return Json(res);
            }
        }

        private object? getOrderUser(int page, int size, string orderName)
        {
            try
            {
                var id = HttpContext.Session.GetInt32("UserId");
                var ls = context.Orders.Where(x => x.OrdUserId == id).Include(x => x.OrderDetails).ThenInclude(x => x.OrdDetailProductNavigation).ThenInclude(x => x.ProCategoryNavigation).ToList();
                var offset = (page - 1) * size;
                var totalRecod = ls.Count();
                var totalPage = (totalRecod % size) == 0 ? (int)(totalRecod / size) : (int)(totalRecod / size + 1);
                var lst = ls.Skip(offset).Take(size).ToList();
                return new
                {
                    Data = lst,
                    TotalRecod = totalRecod,
                    TotalPage = totalPage,
                    Page = page,
                    Size = size,
                };
            }
            catch (Exception) { }
            {
                return null;
            }
        }

        [HttpDelete]
        public IActionResult delete_orderUser(int ordID)
        {
            var message = deleteOrderUser(ordID);
            if (message != false)
            {
                var res = new
                {
                    Success = true,
                    Message = "Delete Success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Delete Error"
                };
                return Json(res);
            }
        }

        private Boolean deleteOrderUser(int ordId)
        {
            try
            {
                var ord = context.Orders.Where(x => x.OrdId == ordId).FirstOrDefault();
                var ordl = context.OrderDetails.Where(x => x.OrdDetailOrder == ordId).FirstOrDefault();
                if (ordl != null)
                {
                    context.OrderDetails.Remove(ordl);
                    context.SaveChanges();
                    if (ord != null)
                    {
                        context.Orders.Remove(ord);
                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }            
        }
    }
}
