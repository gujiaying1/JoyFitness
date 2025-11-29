using System.Collections.Generic;
using JoyRiseFitness.Models;

namespace JoyRiseFitness.Models
{
    public class WorkoutGenViewModel
    {
        public MusclePart? Part { get; set; }
        public string Equipment { get; set; }
        public List<Workout> Generated { get; set; } = new List<Workout>();
    }
}