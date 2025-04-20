import Dexie, { EntityTable } from 'dexie';
import { Assignment, Checklist, ChecklistNode, Subject, Topic } from '../../types/entityTypes';

export const db = new Dexie('MercurialOfflineDB') as Dexie & {
  assignments : EntityTable<
    Assignment,
    'id'
  >,
  topics : EntityTable<
    Topic,
    'id'
  >,
  subjects: EntityTable<
    Subject,
    'id'
  >,
  checklists: EntityTable<
    Checklist,
    'id'
  >
  checklistNodes: EntityTable<
  ChecklistNode,
  'id'
  >
}

db.version(1).stores({
  assignments: '++id, title, noteContent, subjectId, topicId, dueDate, taskState',
  topics:'++id, title, color',
  subjects:'++id, title',
  checklist:'++id, assignmentId',
  checklistNodes: '++id, checklistId, content'
})