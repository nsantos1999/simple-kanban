import { Column } from "./Column";
import { useKanban } from "./contexts/KanbanContext";
import { fakeKanban } from "./fakeKanban";
import { Container } from "./styles";

function Kanban() {
  const { kanbanColumns } = useKanban();

  return (
    <Container>
      {kanbanColumns.map((column, index) => (
        <Column column={column} index={index} key={column.id} />
      ))}
    </Container>
  );
}

export { Kanban };
