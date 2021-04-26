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
  confirmLastUpdate: () => void;
  cancelLastUpdate: () => void;
};

const KanbanContext = createContext({} as IKanbanContext);

function KanbanProvider({ children }: KanbanProviderProps) {
  const [kanbanColumns, setKanbanColumns] = useState(fakeKanban);
  const [kanbanColumnsPreview, setKanbanColumnsPreview] = useState(
    kanbanColumns
  );

  const move = useCallback(
    (fromColumn: number, toColumn: number, from: number, to: number) => {
      setKanbanColumnsPreview(
        produce(kanbanColumnsPreview, (draft) => {
          const issueDragged = draft[fromColumn].issues[from];

          draft[fromColumn].issues.splice(from, 1);
          draft[toColumn].issues.splice(to, 0, issueDragged);
        })
      );

      // console.log(fromColumn, from, to);
    },
    [kanbanColumnsPreview, setKanbanColumnsPreview]
  );

  const confirmLastUpdate = useCallback(() => {
    console.log("Last Update confirmed!");
    setKanbanColumns(kanbanColumnsPreview);
  }, [kanbanColumnsPreview]);

  const cancelLastUpdate = useCallback(() => {
    console.log("Last Update canceled!");
    setKanbanColumnsPreview(kanbanColumns);
  }, [kanbanColumns, setKanbanColumnsPreview]);

  return (
    <KanbanContext.Provider
      value={{
        kanbanColumns: kanbanColumnsPreview,
        move,
        confirmLastUpdate,
        cancelLastUpdate,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

function useKanban() {
  const kanbanContext = useContext(KanbanContext);

  return kanbanContext;
}

export { useKanban, KanbanProvider };
