import React, { useEffect } from "react";
import "./App.css";
import { Typography } from "antd";
const { Title } = Typography;

import Board from "./Components/Board";
import { taskColumns } from "./helper";

const App = () => {
  useEffect(() => {
    localStorage.setItem("taskColumns", JSON.stringify(taskColumns));
  }, []);

  return (
    <div>
      <Title className="title">Kanban Board</Title>
      <Board />
    </div>
  );
};

export default App;
