import { createContext, useCallback, useContext, useState } from "react";
import { KanbanColumn } from "../../../types/kanban";
import { fakeKanban } from "../fakeKanban";
import produce from "immer";

type KanbanProviderProps = {
  children: React.ReactNode;
};

type IKanbanContext = {
  kanbanColumns: KanbanColumn[];
  move: (
    fromColumn: number,
    toColumn: number,
    from: number,
    to: number
  ) => void;
};

const KanbanContext = createContext({} as IKanbanContext);

function KanbanProvider({ children }: KanbanProviderProps) {
  const [kanbanColumns, setKanbanColumns] = useState(fakeKanban);

  const move = useCallback(
    (fromColumn: number, toColumn: number, from: number, to: number) => {
      setKanbanColumns(
        produce(kanbanColumns, (draft) => {
          const issueDragged = draft[fromColumn].issues[from];

          draft[fromColumn].issues.splice(from, 1);
          draft[toColumn].issues.splice(to, 0, issueDragged);
        })
      );

      // console.log(fromColumn, from, to);
    },
    [kanbanColumns, setKanbanColumns]
  );

  return (
    <KanbanContext.Provider value={{ kanbanColumns, move }}>
      {children}
    </KanbanContext.Provider>
  );
}

function useKanban() {
  const kanbanContext = useContext(KanbanContext);

  return kanbanContext;
}

export { useKanban, KanbanProvider };
