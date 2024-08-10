import React, { useEffect } from "react";
import "./App.css";
import { Typography } from "antd";
const { Title } = Typography;

import Board from "./Components/Board";
import { taskColumns } from "./helper";
import Banner from "./Components/Banner";

const App = () => {
  useEffect(() => {
    localStorage.setItem("taskColumns", JSON.stringify(taskColumns));
  }, []);

  const calculateDeadline = () => {
    const now = new Date();
    return new Date(now.getTime() + 6 * 60 * 60 * 1000);
  };

  const deadline = calculateDeadline();

  return (
    <div>
      <Banner deadline={deadline} />
      <Title className="title">Kanban Board</Title>
      <Board />
    </div>
  );
};

export default App;
