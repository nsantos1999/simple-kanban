import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Kanban } from "./views/Kanban";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Kanban />
      </DndProvider>
    </div>
  );
}

export default App;
