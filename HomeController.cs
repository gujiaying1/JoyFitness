using System.Web.Mvc;

namespace JoyRiseFitness.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // 假装当前 37 人，稍后接数据库
            ViewBag.Current = 37;
            ViewBag.Max = 80;
            return View();
        }
    }
}