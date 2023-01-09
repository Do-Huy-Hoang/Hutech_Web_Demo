using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using System.Collections;
using WebDemo.Models;

namespace WebDemo.Controllers.Back_End
{
    public class AdminProductController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        private IWebHostEnvironment _enviroment;

        public AdminProductController(IWebHostEnvironment enviroment)
        {
            _enviroment = enviroment;
        }
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("IsAdmin") != null && (HttpContext.Session.GetString("IsAdmin").Equals("True")))
            {
                return View("Views/Back-end/Product/index.cshtml");
            }
            else
            {
                return Redirect("/404");
            }
          
        }

        [HttpGet]
        public IActionResult create()
        {
            if (HttpContext.Session.GetString("IsAdmin") != null && (HttpContext.Session.GetString("IsAdmin").Equals("True")))
            {
                return View("Views/Back-end/Product/Add.cshtml");
            }
            else
            {
                return Redirect("/404");
            }      
        }

        #region get data
        [HttpGet]
        public IActionResult get_data_product(int Page, int Size, string proName)
        {
            var data = getData(Page, Size, proName);
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
        private object getData(int page, int size, string proName)
        {
            try
            {
                if (proName == null)
                {
                    var ls = from c in context.Products.Where(a => a.IsDelete == false).ToList()
                             orderby c.ProId descending
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
                    var ls = from c in context.Products.Where(a => a.IsDelete == false).ToList()
                             where c.ProName.Contains(proName)
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
        public IActionResult create_product(Product formData)
        {
            var Files = Request.Form.Files;
            var message = createData(formData, Files);
            if (message != 0)
            {
                if (message == 2)
                {
                    var res = new
                    {
                        Success = false,
                        Check = true,
                        Message = "Product name already exist !!!",
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
                    Message = "Create Error",
                };
                return Json(res);
            }
        }

        private int createData(Product formData, dynamic Files)
        {
            try
            {
                dynamic checkPro = context.Products.Where(c => c.ProName.Equals(formData.ProName) && c.IsDelete == false).FirstOrDefault();
                if (checkPro == null)
                {
                    if (Files != null)
                    {
                        Product product = new Product();
                        var fromfile = Files[0];
                        if (fromfile.Length > 0)
                        {
                            DateTime date = DateTime.Now;
                            product.ProName = formData.ProName;
                            product.ProPrice = formData.ProPrice;
                            product.ProQuantity = formData.ProQuantity;
                            product.ProDescription = formData.ProDescription;
                            product.ProImg = "img";
                            product.ProCategory = formData.ProCategory;
                            product.CreateAt = date;
                            product.IsDelete = false;
                            context.Products.Add(product);
                            context.SaveChanges();
                        }
                        var fileName = Path.GetFileName(fromfile.FileName);
                        var path = Path.Combine(_enviroment.WebRootPath, "img/product/" + product.ProId.ToString());
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        path = Path.Combine(path, fromfile.FileName);

                        using var stream = new FileStream(path, FileMode.Create);
                        fromfile.CopyToAsync(stream);

                        // Cap nhat lai url cua san pham sau luu xong hinh anh
                        product.ProImg = "img/product/" + product.ProId.ToString() + "/" + fromfile.FileName;
                        context.Products.Update(product);
                        context.SaveChanges();
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
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
        public IActionResult update_product(Product product)
        {
            var Files = Request.Form.Files;
            var message = updateProduct(product, Files);
            if (message != 0)
            {
                if (message == 2)
                {
                    var res = new
                    {
                        Success = false,
                        Check = true,
                        Message = "Product name already exist !!!",
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
                    Message = "Update Error",
                };
                return Json(res);
            }
        }

        private int updateProduct(Product product, dynamic Files)
        {
            try
            {
                dynamic checkPro1 = context.Products.Where(c => c.ProName.Equals(product.ProName) && c.IsDelete == false && c.ProId != product.ProId).FirstOrDefault();
                if (checkPro1 == null)
                {
                    DateTime date = DateTime.Now;
                    if (product == null)
                    {
                        return 0;
                    }
                    var pro = context.Products.Where(c => c.ProId == product.ProId).FirstOrDefault();
                    if (pro != null)
                    {
                        if (pro.ProName != product.ProName)
                        {
                            pro.ProName = product.ProName;
                        }
                        if (pro.ProPrice != product.ProPrice)
                        {
                            pro.ProPrice = product.ProPrice;
                        }
                        if (pro.ProQuantity != product.ProQuantity)
                        {
                            pro.ProQuantity = product.ProQuantity;
                        }
                        if (pro.ProDescription != product.ProDescription)
                        {
                            pro.ProDescription = product.ProDescription;
                        }
                        if (pro.ProCategory != product.ProCategory)
                        {
                            pro.ProCategory = product.ProCategory;
                        }
                        pro.UpdateAt = date;
                        if (Files.Count > 0)
                        {
                            var fromfile = Files[0];
                            var fileName = Path.GetFileName(fromfile.FileName);
                            var path = Path.Combine(_enviroment.WebRootPath, "img/product/" + product.ProId.ToString());
                            if (!Directory.Exists(path))
                            {
                                Directory.CreateDirectory(path);
                            }
                            path = Path.Combine(path, fromfile.FileName);

                            using var stream = new FileStream(path, FileMode.Create);
                            fromfile.CopyToAsync(stream);

                            // Cap nhat lai url cua san pham sau luu xong hinh anh
                            pro.ProImg = "Img/product/" + pro.ProId.ToString() + "/" + fromfile.FileName;
                            context.Products.Update(pro);
                            context.SaveChanges();
                            return 1;
                        }
                        else
                        {
                            context.Products.Update(pro);
                            context.SaveChanges();
                            return 1;
                        }
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
        public IActionResult delete_product(int proId)
        {
            var message = deleteProduct(proId);
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

        private object? deleteProduct(int proId)
        {
            try
            {
                var ord = context.OrderDetails.Where(c => c.OrdDetailId.Equals(proId)).FirstOrDefault();
                if (ord == null)
                {
                    var pro = context.Products.Where(c => c.ProId == proId).FirstOrDefault();
                    if (pro != null)
                    {
                        context.Products.Remove(pro);
                        context.SaveChanges();
                        return new
                        {
                            Message = "Delete Success"
                        };
                    }

                }
                else
                {
                    var pro = context.Products.Where(c => c.ProId == proId).FirstOrDefault();
                    if (pro != null)
                    {
                        pro.IsDelete = true;
                        context.Products.Update(pro);
                        context.SaveChanges();
                        return new
                        {
                            Message = "Delete Success"
                        };
                    }
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }

    #endregion
}

