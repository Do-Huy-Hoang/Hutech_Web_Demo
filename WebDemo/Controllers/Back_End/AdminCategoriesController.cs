using Microsoft.AspNetCore.Mvc;
using WebDemo.Models;
using System.Diagnostics;
namespace WebDemo.Controllers.Back_End
{
    public class AdminCategoriesController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("IsAdmin") != null && (HttpContext.Session.GetString("IsAdmin").Equals("True")))
            {
                return View("Views/Back-end/Category/index.cshtml");
            }
            else
            {
                return Redirect("/404");
            }       
        }

        [HttpGet]
        public IActionResult create(int id)
        {
            if (HttpContext.Session.GetString("IsAdmin") != null && (HttpContext.Session.GetString("IsAdmin").Equals("True")))
            {
                return View("Views/Back-end/Category/Add.cshtml");
            }
            else
            {
                return Redirect("/404");
            }      
        }

        #region get data
        [HttpGet]
        public IActionResult get_data_categories_all()
        {
            var ls = context.Categories.Where(c=>c.IsDelete == false).ToList();
            var res = new
            {
                Success = true,
                Message = "",
                Data = ls,
            };
            return Json(res);
        }


        [HttpGet]
        public IActionResult get_data_categories(int Page, int Size, string cateName)
        {
            var data = getData(Page, Size, cateName);
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
        private object getData(int page, int size, string cateName)
        {
            try
            {
                if (cateName == null)
                {
                    var ls = from c in context.Categories.Where(c => c.IsDelete == false).ToList()
                             orderby c.CateId descending
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
                else
                {
                    var ls = from c in context.Categories.ToList()
                             where c.CateName.Contains(cateName)
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
        #endregion

        #region create
        [HttpPost]
        public IActionResult create_category(string cateName)
        {
            var message = createData(cateName);
            if (message != 0)
            {
                if (message == 2)
                {
                    var res = new
                    {
                        Success = false,
                        Check = true,
                        Message = "Category name already exist !!!",
                    };
                    return Json(res);                 
                }
                else
                {
                    var res = new
                    {
                        Success = true,
                        Check = false,
                        Message = "Create Success",
                    };
                    return Json(res);
                }        
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Check = false,
                    Message = "Create Error"
                };
                return Json(res);
            }
        }

        private int createData(string cateName)
        {
            try
            {
                var checkCate = context.Categories.Where(c=>c.CateName.Equals(cateName) && c.IsDelete == false).FirstOrDefault();
                if (checkCate == null)
                {
                    DateTime date = DateTime.Now;
                    Category cate = new Category();
                    cate.CateName = cateName;
                    cate.CreateAt = date;
                    cate.IsDelete = false;
                    context.Categories.Add(cate);
                    context.SaveChanges();
                    return 1;
                }
                else
                {
                    return 2;
                }
            }
            catch (Exception)
            {
                return 0;
            }
        }
        #endregion

        #region update
        [HttpPost]
        public IActionResult update_category(Category category)
        {
            var message = updateCategory(category);
            if (message != 0)
            {
                if (message == 2)
                {
                    var res = new
                    {
                        Success = false,
                        Check = true,
                        Message = "Category name already exist !!!",
                    };
                    return Json(res);
                }
                else
                {
                    var res = new
                    {
                        Success = true,
                        Check = false,
                        Message = "Update Success",
                    };
                    return Json(res);
                }
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Check = false,
                    Message = "Update Error"
                };
                return Json(res);
            }
        }

        private int updateCategory(Category category)
        {
            try
            {
                var checkCate = context.Categories.Where(c => c.CateName.Equals(category.CateName) && c.IsDelete == false && c.CateId != category.CateId).FirstOrDefault();
                if (checkCate == null)
                {
                    DateTime date = DateTime.Now;
                    if (category == null)
                    {
                        return 0;
                    }
                    var cate = context.Categories.Where(c => c.CateId == category.CateId).FirstOrDefault();
                    if (cate != null)
                    {
                        if (cate.CateName != category.CateName)
                        {
                            cate.CateName = category.CateName;
                        }
                        cate.UpdateAt = date;
                        context.Categories.Update(cate);
                        context.SaveChanges();
                        return 1;
                    }
                }
                return 2;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        #endregion

        #region delete
        [HttpDelete]
        public IActionResult delete_category(int cateId)
        {
            var message = deleteCategory(cateId);
            if (message != null)
            {
                var res = new
                {
                    Success = true,
                    Failed = false,
                    Message = "Delete Success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Failed = true,
                    Message = "Delete Error"
                };
                return Json(res);
            }
        }

        private object? deleteCategory(int cateId)
        {
            try
            {
                var checkPro = context.Products.Where(p => p.ProCategory == cateId).ToList();
                if (checkPro.Count == 0)
                {
                    var cate = context.Categories.Where(c => c.CateId == cateId).FirstOrDefault();
                    if (cate != null)
                    {
                        context.Categories.Remove(cate);
                        context.SaveChanges();
                        return new
                        {
                            Message = "Delete Success"
                        };
                    }
                    return null;
                }
                else
                {
                    var cate = context.Categories.Where(c => c.CateId == cateId).FirstOrDefault();
                    if (cate != null)
                    {
                        cate.IsDelete = true;
                        context.Categories.Update(cate);
                        context.SaveChanges();
                        return new
                        {
                            Message = "Delete Success"
                        };
                    }
                    return null;
                }
                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion
    }
}
