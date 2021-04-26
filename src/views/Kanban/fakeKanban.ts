import { KanbanColumn } from "../../types/kanban";
import { v4 as uuidv4 } from "uuid";

export const fakeKanban: KanbanColumn[] = [
  {
    id: uuidv4(),
    title: "Backlog",
    createdAt: new Date(),
    issues: [
      {
        id: uuidv4(),
        title: "Backlog 1",
        status: "A",
        userCreator: "Natã Souza Santos",
        userResponsible: "Natã Souza Santos",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Backlog 2",
        status: "A",
        userCreator: "Natã Souza Santos",
        userResponsible: "Natã Souza Santos",
        createdAt: new Date(),
      },
    ],
  },
  {
    id: uuidv4(),
    title: "To Do",
    createdAt: new Date(),
    issues: [
      {
        id: uuidv4(),
        title: "To Do 1",
        status: "A",
        userCreator: "Natã Souza Santos",
        userResponsible: "Natã Souza Santos",
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "To Do 2",
        status: "A",
        userCreator: "Natã Souza Santos",
        userResponsible: "Natã Souza Santos",
        createdAt: new Date(),
      },
    ],
  },
];
