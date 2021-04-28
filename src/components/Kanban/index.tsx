import { KanbanColumn } from "../../types/kanban";
import { KanbanContent } from "./Content";
import { KanbanProvider } from "./contexts/KanbanContext";

export type SimpleKanbanProps = {
  initialData: KanbanColumn[];
};

function SimpleKanban({ initialData }: SimpleKanbanProps) {
  return (
    <KanbanProvider initialData={initialData}>
      <KanbanContent />
    </KanbanProvider>
  );
}

export { SimpleKanban };
