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

export type DragIssueObject = {
  type: string;
  index: number;
  columnIndex: number;
  id: number;
};

export type CollectedProps = {
  isOver: boolean;
};

function Issue({ issue, index, columnIndex }: KanbanIssueProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { move, confirmLastUpdate, cancelLastUpdate } = useKanban();

  const [{ isDragging }, dragRef] = useDrag({
    type: "ISSUE",
    item: { type: "ISSUE", index, columnIndex, id: issue.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item, monitor) {
      if (!monitor.didDrop()) {
        cancelLastUpdate();
      }
    },
  });

  const [{ isOver }, dropRef] = useDrop<
    DragIssueObject,
    unknown,
    CollectedProps
  >({
    accept: "ISSUE",
    hover(item, monitor) {
      const draggedColumnIndex = item.columnIndex;
      const draggedIndex = item.index;
      const draggedOffset = monitor.getClientOffset();

      const targetIndex = index;
      const targetColumnIndex = columnIndex;
      const targetSize = ref.current?.getBoundingClientRect();

      if (!targetSize || !draggedOffset) {
        return;
      }

      if (item.id === issue.id) {
        return;
      }

      if (
        targetIndex === draggedIndex &&
        targetColumnIndex === draggedColumnIndex
      ) {
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
