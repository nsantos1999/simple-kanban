import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Kanban } from "./views/Kanban";
import { KanbanProvider } from "./views/Kanban/contexts/KanbanContext";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <KanbanProvider>
          <Kanban />
        </KanbanProvider>
      </DndProvider>
    </div>
  );
}

export default App;
