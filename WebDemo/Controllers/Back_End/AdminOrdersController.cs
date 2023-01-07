using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Net;
using WebDemo.Models;

namespace WebDemo.Controllers.Back_End
{
    public class AdminOrdersController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            return View("Views/Back-end/Order/index.cshtml");
        }

        [HttpGet]
        public IActionResult get_data_order(int Page, int Size, string orderName)
        {
            var data = getOrder(Page, Size, orderName);
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

        private object? getOrder(int page, int size, string ordName)
        {
            try
            {
                if (ordName == null)
                {
                    var ls = context.Orders.Include(x => x.OrderDetails).ThenInclude(x => x.OrdDetailProductNavigation).ToList();
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
                else
                {
                    var ls = from c in context.Orders.ToList()
                             where c.OrdName.Contains(ordName)
                             select c;
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
                        Size = size
                    };
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        public IActionResult delete_order(int ordID)
        {
            var message = deleteOrder(ordID);
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

        private Boolean deleteOrder(int ordId)
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
            }
            return false;
        }

    }
}