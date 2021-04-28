import { SimpleKanban } from "../../components/Kanban";
import { fakeKanban } from "./fakeKanban";

function Kanban() {
  return <SimpleKanban initialData={fakeKanban} />;
}

export { Kanban };
