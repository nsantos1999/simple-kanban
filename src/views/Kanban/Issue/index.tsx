import { Card } from "../../../components/Card";
import { KanbanIssue } from "../../../types/kanban";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { useKanban } from "../contexts/KanbanContext";

export type KanbanIssueProps = {
  issue: KanbanIssue;
  index: number;
  columnIndex: number;
};

export type DragObject = {
  type: string;
  index: number;
  columnIndex: number;
};

export type CollectedProps = {
  isOver: boolean;
};

function Issue({ issue, index, columnIndex }: KanbanIssueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { move, confirmLastUpdate, cancelLastUpdate } = useKanban();

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { type: "CARD", index, columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item, monitor) {
      if (!monitor.didDrop()) {
        cancelLastUpdate();
      }
    },
  });

  const [{ isOver }, dropRef] = useDrop<DragObject, unknown, CollectedProps>({
    accept: "CARD",
    hover(item, monitor) {
      const draggedColumnIndex = item.columnIndex;
      const draggedIndex = item.index;
      const draggedOffset = monitor.getClientOffset();

      const targetIndex = index;
      const targetColumnIndex = columnIndex;
      const targetSize = ref.current?.getBoundingClientRect();

      if (
        targetIndex === draggedIndex &&
        targetColumnIndex === draggedColumnIndex
      ) {
        return;
      }

      if (!targetSize) {
        return;
      }

      if (!draggedOffset) {
        return;
      }

      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedTop = draggedOffset.y - targetSize.top;

      if (
        draggedIndex < targetIndex &&
        draggedTop < targetCenter &&
        draggedColumnIndex === targetColumnIndex
      ) {
        return;
      }

      if (
        draggedIndex > targetIndex &&
        draggedTop > targetCenter &&
        draggedColumnIndex === targetColumnIndex
      ) {
        return;
      }

      move(draggedColumnIndex, targetColumnIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.columnIndex = targetColumnIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop() {
      confirmLastUpdate();
    },
  });

  dragRef(dropRef(ref));

  return (
    <div ref={ref}>
      <Card isDragging={isDragging || isOver} header={<p>{issue.title}</p>} />
    </div>
  );
}

export { Issue };
