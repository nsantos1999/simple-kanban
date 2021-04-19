import { Card } from "../../../components/Card";
import { KanbanColumn } from "../../../types/kanban";
import { Issue } from "../Issue";
import { IssueContent } from "./styles";

export type KanbanColumnProps = {
  column: KanbanColumn;
  index: number;
};

function Column({ column, index: columnIndex }: KanbanColumnProps) {
  // console.log(columnIndex);
  return (
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
    />
  );
}

export { Column };
