using Microsoft.AspNetCore.Mvc;
using WebDemo.Models;
using System.Diagnostics;
namespace WebDemo.Controllers.Back_End
{
    public class CategoriesController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index()
        {
            return View("Views/Back-end/Category/index.cshtml");
        }

        [HttpGet]
        public IActionResult create(int id)
        {

            return View("Views/Back-end/Category/Add.cshtml");
        }

        #region get data
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
                    var ls = from c in context.Categories.ToList()
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
            if (message != null)
            {
                var res = new
                {
                    Success = true,
                    Message = "Create Success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Create Error"
                };
                return Json(res);
            }
        }

        private object createData(string cateName)
        {
            try
            {
                DateTime date = DateTime.Now;
                Category cate = new Category();
                cate.CateName = cateName;
                cate.CreateAt = date;
                context.Categories.Add(cate);
                context.SaveChanges();
                return new
                {
                    Message = "Success"
                };
            }
            catch (Exception)
            {

                throw;
            }
        }
        #endregion

        #region update
        [HttpPost]
        public IActionResult update_category(Category category)
        {
            var message = updateCategory(category);
            if (message != null)
            {
                var res = new
                {
                    Success = true,
                    Message = "Create Success",
                };
                return Json(res);
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Create Error"
                };
                return Json(res);
            }
        }

        private object? updateCategory(Category category)
        {
            try
            {
                DateTime date = DateTime.Now;
                if (category == null)
                {
                    return null;
                }        
                var cate = context.Categories.Where(c=>c.CateId==category.CateId).FirstOrDefault();
                if (cate != null)
                {
                    if (cate.CateName != category.CateName)
                    {
                        cate.CateName = category.CateName;
                    }
                    cate.UpdateAt = date;
                    context.Categories.Update(cate);
                    context.SaveChanges();
                    return new
                    {
                        Message = "Success"
                    };
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion

        #region delete
        [HttpDelete]
        public IActionResult delete_category(int cateId)
        {
            var message = deleteCategory(cateId);
            if (message!= null)
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
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion
    }
}
