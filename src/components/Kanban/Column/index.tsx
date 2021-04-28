import { motion } from "framer-motion";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { issueAnimation } from "../../../animations/kanbanAnimations";
import { Card } from "../../../components/Card";
import { KanbanColumn } from "../../../types/kanban";
import { useKanban } from "../contexts/KanbanContext";
import { Issue, DragIssueObject } from "../Issue";
import { Container, IssueContent } from "./styles";

export type DragColumnObject = {
  type: string;
  columnIndex: number;
  id: number;
};

export type KanbanColumnProps = {
  column: KanbanColumn;
  index: number;
};

function Column({ column, index: columnIndex }: KanbanColumnProps) {
  const { move, moveColumn, confirmLastUpdate, cancelLastUpdate } = useKanban();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "COLUMN",
    item: { type: "ISSUE", columnIndex, id: column.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    isDragging(monitor) {
      return column.id === monitor.getItem().id;
    },
    end(item, monitor) {
      if (!monitor.didDrop()) {
        cancelLastUpdate();
      }
    },
  });

  const [, dropColumnRef] = useDrop<DragColumnObject, unknown, unknown>({
    accept: "COLUMN",
    hover(item, monitor) {
      const draggedColumnIndex = item.columnIndex;

      const targetColumnIndex = columnIndex;

      if (item.id === column.id) {
        return;
      }

      if (targetColumnIndex === draggedColumnIndex) {
        return;
      }

      // const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      // const draggedTop = draggedOffset.y - targetSize.top;

      // if (
      //   draggedIndex < targetIndex &&
      //   draggedTop < targetCenter &&
      //   draggedColumnIndex === targetColumnIndex
      // ) {
      //   return;
      // }

      // if (
      //   draggedIndex > targetIndex &&
      //   draggedTop > targetCenter &&
      //   draggedColumnIndex === targetColumnIndex
      // ) {
      //   return;
      // }

      // move(draggedColumnIndex, targetColumnIndex, draggedIndex, targetIndex);

      // console.log(
      //   "Moved!",
      //   `Column ${draggedColumnIndex} -> ${targetColumnIndex}; Issue ${draggedIndex} -> ${targetIndex}`
      // );
      // item.index = targetIndex;

      moveColumn(draggedColumnIndex, targetColumnIndex);
      item.columnIndex = targetColumnIndex;
    },
    drop() {
      confirmLastUpdate();
    },
  });

  // console.log(columnIndex);
  const [, dropIssueRef] = useDrop<DragIssueObject, unknown, unknown>({
    accept: "ISSUE",
    hover(item, monitor) {
      const draggedColumnIndex = item.columnIndex;
      const draggedIndex = item.index;

      const targetColumnIndex = columnIndex;

      if (column.issues.length > 0) {
        return;
      }

      move(draggedColumnIndex, targetColumnIndex, draggedIndex, 0);

      item.index = 0;
      item.columnIndex = targetColumnIndex;
    },
    drop() {
      if (column.issues.length > 0) {
        return;
      }

      confirmLastUpdate();
    },
  });

  dragRef(dropColumnRef(dropIssueRef(ref)));

  return (
    <Container ref={ref}>
      <Card
        header={<h3>{column.title}</h3>}
        isDragging={isDragging}
        content={
          <>
            {column.issues.map((issue, index) => (
              <motion.div variants={issueAnimation} key={issue.id}>
                <IssueContent>
                  <Issue
                    issue={issue}
                    index={index}
                    columnIndex={columnIndex}
                  />
                </IssueContent>
              </motion.div>
            ))}
          </>
        }
        backgroundColor={"#EBECF0"}
      />
    </Container>
  );
}

export { Column };
