export type KanbanIssueTag = {
  name: string;
  color: string;
};

export type KanbanIssueComment = {
  message: string;
  //TODO: Create and change data type to responsible
  userComment: any;
  commentedAt: Date;
};

export type KanbanIssueChecklist = {
  title: string;
  items: KanbanIssueChecklistItem[];
};

export type KanbanIssueChecklistItem = {
  description: string;
  finished: boolean;
  createdAt: Date;
};

export type KanbanIssueStatus = "A" | "I";

export type KanbanIssue = {
  id: string | number;
  title: string;
  description?: string;
  //TODO: Create and change data type to attachment
  attachments?: any[];
  checklists?: KanbanIssueChecklist[];
  //TODO: Create and change data type to responsible
  userResponsible: any;
  //TODO: Create and change data type to creator
  userCreator: any;
  tags?: KanbanIssueTag[];
  deliveryDate?: Date;
  comments?: Comment[];
  status: KanbanIssueStatus;
  createdAt: Date;
};

export type KanbanColumn = {
  id: string | number;
  title: string;
  createdAt: Date;
  issues: KanbanIssue[];
};
