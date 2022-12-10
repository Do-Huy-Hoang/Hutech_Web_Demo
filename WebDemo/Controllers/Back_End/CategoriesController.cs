using Microsoft.AspNetCore.Mvc;
using WebDemo.Models;
using System.Diagnostics;
namespace WebDemo.Controllers.Back_End
{
    public class CategoriesController : Controller
    {
        WebDemoContext context = new WebDemoContext();
        public IActionResult Index(int pg=1)
        {
            List<Category> categories = context.Categories.ToList();

            const int pageSize = 10;
            if (pg < 1)
            {
                pg = 1;
            }
            int resCount = categories.Count;
            var pager = new Paper(resCount, pg, pageSize);

            int recSkip = (pg-1) * pageSize;

            List<Category> data = categories.Skip(recSkip).Take(pager.PageSize).ToList();
            this.ViewBag.Paper = pager;
            return View("Views/Back-end/Category/index.cshtml",data);
        }

        
        public IActionResult create()
        {
            return View("Views/Back-end/Category/Add.cshtml");
        }


    }
}
