using System.Linq;
using System.Web.Mvc;
using JoyRiseFitness.Models;

namespace JoyRiseFitness.Controllers
{
    public class MemberController : Controller
    {
        // 静态用户池
        private static System.Collections.Generic.List<User> _users
            = new System.Collections.Generic.List<User>();
        private static int _uid = 1;

        #region 登录 / 注册 / 退出
        public ActionResult Login() => View();

        [HttpPost]
        public ActionResult Login(string userName, string password)
        {
            var u = _users.FirstOrDefault(x =>
                   x.UserName == userName && x.Password == password);
            if (u == null) { ModelState.AddModelError("", "账号或密码错误"); return View(); }

            Session["uid"] = u.Id;
            Session["uname"] = u.UserName;
            return RedirectToAction("Dashboard");
        }

        public ActionResult Register() => View();

        [HttpPost]
        public ActionResult Register(User u)
        {
            if (!ModelState.IsValid) return View();
            if (_users.Any(x => x.UserName == u.UserName))
            { ModelState.AddModelError("", "用户名已存在"); return View(); }

            u.Id = _uid++;
            _users.Add(u);
            return RedirectToAction("Login");
        }

        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Index", "Home");
        }
        #endregion

        // 会员中心首页
        public ActionResult Dashboard()
        {
            if (Session["uid"] == null) return RedirectToAction("Login");
            ViewBag.Uname = Session["uname"];
            return View();
        }
    }
}