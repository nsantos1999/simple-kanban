import { motion } from "framer-motion";
import {
  columnAnimation,
  containerAnimation,
} from "../../animations/kanbanAnimations";
import { AddNewColumn } from "./AddNewColumn";
import { Column } from "./Column";
import { useKanban } from "./contexts/KanbanContext";
import { Container } from "./styles";

function Kanban() {
  const { kanbanColumns } = useKanban();

  return (
    <Container variants={containerAnimation} initial="hidden" animate="visible">
      {kanbanColumns.map((column, index) => (
        <motion.div variants={columnAnimation} style={{ display: "flex" }}>
          <Column column={column} index={index} key={column.id} />
        </motion.div>
      ))}
      <AddNewColumn />
    </Container>
  );
}

export { Kanban };
