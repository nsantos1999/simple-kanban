import { Card } from "../../../components/Card";
import { useKanban } from "../contexts/KanbanContext";
import { Container } from "./styles";

function AddNewColumn() {
  const { addNewColumn } = useKanban();

  return (
    <Container>
      <Card
        content={"+ Adicionar nova coluna"}
        backgroundColor={"#EBECF0"}
        onClick={addNewColumn}
      />
    </Container>
  );
}

export { AddNewColumn };
