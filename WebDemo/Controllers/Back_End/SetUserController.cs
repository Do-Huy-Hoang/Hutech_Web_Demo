using Microsoft.AspNetCore.Mvc;
using WebDemo.Models;

namespace WebDemo.Controllers.Back_End
{
    public class SetUserController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            return View("Views/Back-end/SetUser/index.cshtml");
        }
        [HttpGet]
        public IActionResult get_data_user(int Page, int Size, string userName)
        {
            var data = getUser(Page, Size, userName);
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

        private object? getUser(int page, int size, string userName)
        {
            try
            {
                if (userName == null)
                {
                    var ls = context.Users.ToList();
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
                    var ls = context.Users.ToList();
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

        #region update
        [HttpPost]
        public IActionResult update_user(User user)
        {
            var message = updateUser(user);
            if (message != null)
            {
                var res = new
                {
                    Success = true,
                    Message = "Update Success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Update Error"
                };
                return Json(res);
            }
        }

        private object? updateUser(User user)
        {
            try
            {
                DateTime date = DateTime.Now;
                if (user == null)
                {
                    return null;
                }
                var setuser = context.Users.Where(c => c.UserId == user.UserId).FirstOrDefault();
                if (setuser != null)
                {
                    if (setuser.IsAdmin != user.IsAdmin)
                    {
                        setuser.IsAdmin = user.IsAdmin;
                    }
                    setuser.UpdateAt = date;
                    context.Users.Update(setuser);
                    context.SaveChanges();
                    return new
                    {
                        Message = "Success"
                    };
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        #endregion

        /*        [HttpDelete]
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
                }*/

    }
}