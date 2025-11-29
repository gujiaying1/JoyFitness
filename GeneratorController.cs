using JoyRiseFitness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace JoyRiseFitness.Controllers
{
    public class GeneratorController : Controller
    {
        // 静态动作池（复用 Workout 类）
        private static List<Workout> _db = WorkoutSeed.Seed();

        // 生成器主页
        public ActionResult Index() => View(new WorkoutGenViewModel());

        // 生成动作（AJAX）
        [HttpPost]
        public ActionResult Generate(WorkoutGenViewModel vm)
        {
            var query = _db.AsEnumerable();
            if (vm.Part.HasValue) query = query.Where(w => w.Part == vm.Part.Value);
            if (!string.IsNullOrEmpty(vm.Equipment))
                query = query.Where(w => w.Name.Contains(vm.Equipment)); // 简易匹配

            var rnd = new Random();
            vm.Generated = query.OrderBy(x => rnd.Next()).Take(5).ToList(); // 随机5个
            return PartialView("_GeneratedList", vm.Generated);
        }

        // 保存到 Session（作业级）
        [HttpPost]
        public ActionResult SavePlan(List<int> ids)
        {
            // 取出旧计划
            var oldPlan = Session["MyPlan"] as List<Workout> ?? new List<Workout>();
            // 追加新动作（去重）
            var newPlan = _db.Where(w => ids.Contains(w.Id)).ToList();
            oldPlan.AddRange(newPlan);
            oldPlan = oldPlan.GroupBy(w => w.Id)   // 按 ID 去重
                             .Select(g => g.First())
                             .ToList();
            Session["MyPlan"] = oldPlan;
            return Json(new { ok = true, count = oldPlan.Count });
        }

        // 从计划里删除一个动作
        [HttpPost]
        public ActionResult RemoveFromPlan(int id)
        {
            var plan = Session["MyPlan"] as List<Workout> ?? new List<Workout>();
            plan.RemoveAll(w => w.Id == id);
            Session["MyPlan"] = plan;
            return Json(new { ok = true, count = plan.Count });
        }
        // 返回“我的计划”Partial
        public ActionResult MyPlan()
        {
            var plan = Session["MyPlan"] as List<Workout> ?? new List<Workout>();
            return PartialView("_MyPlan", plan);
        }
    }
}