import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../../../components/Card";
import { KanbanColumn } from "../../../types/kanban";
import { useKanban } from "../contexts/KanbanContext";
import { Issue, DragIssueObject, CollectedProps } from "../Issue";
import { Container, IssueContent } from "./styles";

export type KanbanColumnProps = {
  column: KanbanColumn;
  index: number;
};

function Column({ column, index: columnIndex }: KanbanColumnProps) {
  const { move, confirmLastUpdate } = useKanban();
  const ref = useRef<HTMLDivElement>(null);

  // console.log(columnIndex);
  const [, dropRef] = useDrop<DragIssueObject, unknown, unknown>({
    accept: "ISSUE",
    hover(item, monitor) {
      const draggedColumnIndex = item.columnIndex;
      const draggedIndex = item.index;

      // const draggedOffset = monitor.getClientOffset();

      // const targetIndex = index;
      const targetColumnIndex = columnIndex;

      if (column.issues.length > 0) {
        return;
      }

      // console.log(
      //   "Hover Column",
      //   draggedColumnIndex,
      //   targetColumnIndex,
      //   draggedIndex,
      //   0
      // );

      move(draggedColumnIndex, targetColumnIndex, draggedIndex, 0);
    },
    drop() {
      if (column.issues.length > 0) {
        return;
      }

      confirmLastUpdate();
    },
  });

  dropRef(ref);

  return (
    <Container ref={ref}>
      <Card
        header={<h3>{column.title}</h3>}
        content={
          <>
            {column.issues.map((issue, index) => (
              <IssueContent key={issue.id}>
                <Issue issue={issue} index={index} columnIndex={columnIndex} />
              </IssueContent>
            ))}
          </>
        }
        backgroundColor={"#EBECF0"}
      />
    </Container>
  );
}

export { Column };
