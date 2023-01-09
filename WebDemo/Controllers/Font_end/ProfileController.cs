using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebDemo.Models;

namespace WebDemo.Controllers.Font_end
{
    public class ProfileController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                return View("Views/Font-end/User/Profile.cshtml");
            }
            else
            {
                return View("Views/Font-end/Login/Login.cshtml");
            }

        }

        [HttpGet]
        public IActionResult getUser()
        {
            if (HttpContext.Session.GetInt32("UserId") != null)
            {
                var id =HttpContext.Session.GetInt32("UserId");
                var data = context.Users.Where(a => a.UserId == id);
                if (data != null)
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

        [HttpPost]
        public IActionResult update_User(User user)
        {
            var message = updateUser(user);
            if (message != null)
            {
                var res = new
                {
                    Success = true,
                    Massage = "Update success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Massage = "Update Error"
                };
                return Json(res);
            }
        }

        private object? updateUser(User user)
        {
            try
            {
                if (user != null)
                {
                    DateTime date = DateTime.Now;
                    var updateUser = context.Users.Where(x => x.UserId == user.UserId).FirstOrDefault();
                    if (updateUser.UserName != user.UserName)
                    {
                        updateUser.UserName = user.UserName;
                    }                     
                    if (updateUser.UserPhoneNumber != user.UserPhoneNumber)
                    {
                        updateUser.UserPhoneNumber = user.UserPhoneNumber;
                    }                       
                    if (updateUser.UserEmail != user.UserEmail)
                    {
                        updateUser.UserEmail = user.UserEmail;
                    }                      
                    if (updateUser.UserAddress != user.UserAddress)
                    {
                        updateUser.UserAddress = user.UserAddress;
                    }                        
                    updateUser.UpdateAt = date;
                    context.Users.Update(updateUser);
                    context.SaveChanges();
                    return updateUser;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
