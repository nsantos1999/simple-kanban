import { createContext, useCallback, useContext, useState } from "react";
import { KanbanColumn } from "../../../types/kanban";
import { fakeKanban } from "../fakeKanban";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

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
  moveColumn: (fromColumn: number, toColumn: number) => void;
  confirmLastUpdate: () => void;
  cancelLastUpdate: () => void;
  addNewColumn: () => void;
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

  const moveColumn = useCallback(
    (fromColumn: number, toColumn: number) => {
      const produceResult = produce(kanbanColumnsPreview, (draft) => {
        const columnDragged = draft[fromColumn];

        draft.splice(fromColumn, 1);
        draft.splice(toColumn, 0, columnDragged);
      });
      console.log(produceResult);
      setKanbanColumnsPreview(produceResult);
    },
    [kanbanColumnsPreview, setKanbanColumnsPreview]
  );

  const confirmLastUpdate = useCallback(() => {
    setKanbanColumns(kanbanColumnsPreview);
  }, [kanbanColumnsPreview]);

  const cancelLastUpdate = useCallback(() => {
    setKanbanColumnsPreview(kanbanColumns);
  }, [kanbanColumns, setKanbanColumnsPreview]);

  const addNewColumn = useCallback(() => {
    setKanbanColumnsPreview([
      ...kanbanColumns,
      {
        id: uuidv4(),
        title: "New Column",
        issues: [],
        createdAt: new Date(),
      },
    ]);

    confirmLastUpdate();
  }, [setKanbanColumnsPreview, confirmLastUpdate, kanbanColumns]);

  return (
    <KanbanContext.Provider
      value={{
        kanbanColumns: kanbanColumnsPreview,
        move,
        moveColumn,
        confirmLastUpdate,
        cancelLastUpdate,
        addNewColumn,
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
