/* Adapted from the teacher's C++ V3 progress.js. One rule drives gates, Boss HP and certificates. */
(function (root) {
  "use strict";
  const required = step => (step?.challenges || []).filter(task => !task.advanced && !task.bonus);
  function assess(steps, passed = {}) {
    const stages = steps.filter(step => step.kind !== "gate");
    const missing = stages.flatMap(step => required(step).filter(task => !passed[task.id]).map(task => ({
      id: task.id, title: task.title || task.id, stage: step.id, stageTitle: step.title
    })));
    const boss = stages.find(step => step.kind === "boss");
    const tasks = required(boss);
    const done = tasks.filter(task => passed[task.id]).length;
    const completed = stages.length > 0 && missing.length === 0;
    const advanced = (boss?.challenges || []).filter(task => task.advanced && !task.bonus);
    return {
      completed,
      gold: completed && advanced.length > 0 && advanced.every(task => passed[task.id]),
      missing,
      boss: { total: tasks.length, done, hp: tasks.length ? Math.round(100 * (tasks.length - done) / tasks.length) : 0 }
    };
  }
  root.LearningProgress = { required, assess };
})(typeof window === "undefined" ? globalThis : window);
