import { readJSON, writeJSON } from "./safeStorage";
export function normalizeRevision(task) {
  const scheduledAt = Number(task.scheduledAt) || new Date(task.dueAt).getTime() || Date.now();
  return { ...task, title: task.title || task.topicName || task.topicId, topicName: task.topicName || task.title, source: task.source || "topic", priority: task.priority || "medium", scheduledAt, dueAt: new Date(scheduledAt).toISOString(), revisionCount: Number(task.revisionCount ?? task.level) || 0, level: Number(task.level ?? task.revisionCount) || 0 };
}
export function readRevisions() {
  const study = readJSON("studyState", {}) || {};
  const current = Array.isArray(study.revisions) ? study.revisions : [];
  const legacy = study.revisionSchema === 1 ? [] : readJSON("ssc-sentinel-revisions", []);
  const records = [...(Array.isArray(legacy) ? legacy : []), ...current].filter(item => item && typeof item.id === "string");
  return [...new Map(records.map(item => [item.id, normalizeRevision(item)])).values()];
}
export function writeRevisions(tasks) {
  writeJSON("studyState", { ...readJSON("studyState", {}), revisionSchema: 1, revisions: tasks.map(normalizeRevision) });
  return tasks;
}
export function addRevisionTask(task) {
  const tasks = readRevisions();
  return tasks.some(item => item.id === task.id) ? tasks : writeRevisions([task, ...tasks]);
}
export function addRevisionTasks(newTasks) {
  for (const task of newTasks || []) if (!readRevisions().some(item => item.topicId === task.topicId && item.source === task.source && !item.completed)) addRevisionTask(task);
  return readRevisions();
}
export const updateRevisionTask = task => writeRevisions(readRevisions().map(item => item.id === task.id ? task : item));
export const removeRevisionTask = id => writeRevisions(readRevisions().filter(item => item.id !== id));
export const clearRevisions = () => writeRevisions([]);
export const getRevisionTaskById = id => readRevisions().find(item => item.id === id) || null;
export default { readRevisions, writeRevisions, addRevisionTask, addRevisionTasks, updateRevisionTask, removeRevisionTask, clearRevisions, getRevisionTaskById };
