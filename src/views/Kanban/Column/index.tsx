import { motion } from "framer-motion";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../../../components/Card";
import { KanbanColumn } from "../../../types/kanban";
import { useKanban } from "../contexts/KanbanContext";
import { Issue, DragIssueObject } from "../Issue";
import { Container, IssueContent } from "./styles";

export type KanbanColumnProps = {
  column: KanbanColumn;
  index: number;
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
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

      const targetColumnIndex = columnIndex;

      if (column.issues.length > 0) {
        return;
      }

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
    <motion.div variants={container} initial="hidden" animate="visible">
      <Container ref={ref}>
        <Card
          header={<h3>{column.title}</h3>}
          content={
            <>
              {column.issues.map((issue, index) => (
                <motion.div variants={item}>
                  <IssueContent key={issue.id}>
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
    </motion.div>
  );
}

export { Column };
