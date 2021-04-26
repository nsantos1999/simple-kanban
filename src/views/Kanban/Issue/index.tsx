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
  isDragging: boolean;
};

function Issue({ issue, index, columnIndex }: KanbanIssueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { move, confirmUpdate, cancelUpdate } = useKanban();

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "CARD", index, columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: "CARD",
    end(item, monitor) {
      if (!monitor.didDrop()) {
        cancelUpdate();
      }
      // console.log("Drag end!", );
    },
  });

  const [, dropRef] = useDrop<DragObject, unknown, unknown>({
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
    drop() {
      confirmUpdate();
    },
  });

  dragRef(dropRef(ref));

  return (
    <div ref={ref}>
      <Card isDragging={isDragging} header={<p>{issue.title}</p>} />
    </div>
  );
}

export { Issue };
