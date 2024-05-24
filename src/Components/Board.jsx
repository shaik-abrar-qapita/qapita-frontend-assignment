import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import "./Board.css";
import { countTasks } from "../helper";
import TaskForm from "./TaskForm";
import { Button, Divider, Form, Input, Modal, Tooltip } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const oldTasks = localStorage.getItem("tasksArray");
const oldTasksColumnData = localStorage.getItem("taskColumns");

const Board = () => {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  const [taskColumnData, setTaskColumnData] = useState(
    JSON.parse(oldTasksColumnData) || []
  );

  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasksArray", JSON.stringify(tasks));
  }, [tasks]);

  const handleDeleteColumn = (title) => {
    console.log("handle delete column " + title);
    const newTaskColumnData = taskColumnData.filter(
      (data) => data.name !== title
    );
    setTaskColumnData(newTaskColumnData);
    console.log(newTaskColumnData);
  };

  useEffect(() => {
    localStorage.setItem("taskColumns", JSON.stringify(taskColumnData));
  }, [taskColumnData]);

  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    const newColumnData = {
      name: values.columnName,
      status: values.columnName,
      bgColor: "lightblue",
    };
    console.log(newColumnData);
    setTaskColumnData((prev) => {
      //   console.log(JSON.parse(prev));
      return [...prev, newColumnData];
    });

    setVisible(false); // Close the modal after form submission
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addNewColumn = () => {
    showModal();
  };

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task, index) => task.taskId !== taskId);
    setTasks(newTasks);
  };

  const onDrop = (status, position) => {
    console.log(
      "Card is dropping in " +
        status +
        " category at positon - " +
        (position + 1)
    );

    if (activeCard === null || activeCard === undefined) return;

    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);

    updatedTasks.splice(position, 0, { ...taskToMove, status: status });
    setTasks(updatedTasks);
    console.log(taskToMove);
  };

  //   console.log(tasks.length);

  //   for (let i = 0; i < tasks.length; i++) {
  //     const element = tasks[i];
  //     console.log(element);
  //   }

  //   console.log(taskColumnData);

  //   if (taskColumnData === null || taskColumnData === undefined) return;

  return (
    <div>
      <TaskForm setTasks={setTasks} data={taskColumnData} />
      <Divider />
      <div className="grid">
        {/* {console.log(taskColumnData)} */}
        {Array.isArray(taskColumnData) &&
          taskColumnData.map((obj, index) => {
            return (
              <div key={index}>
                <TaskList
                  tasks={tasks}
                  status={obj.status}
                  title={obj.name}
                  bgColor={obj.bgColor}
                  key={index}
                  setTasks={setTasks}
                  handleDelete={handleDelete}
                  count={countTasks(tasks, obj.status)}
                  setActiveCard={setActiveCard}
                  onDrop={onDrop}
                  handleDeleteColumn={handleDeleteColumn}
                />
              </div>
            );
          })}
        <Tooltip title="Add new Column">
          <Button
            className="task-column"
            shape="circle"
            onClick={addNewColumn}
            icon={<PlusCircleOutlined />}
          ></Button>
        </Tooltip>
      </div>
      <Modal
        title="Add New Column"
        // visible={visible}
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="basic" onFinish={onFinish}>
          <Form.Item
            label="Column Name"
            name="columnName"
            rules={[{ required: true, message: "Please enter column name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="btns-div">
              <Button className="btns" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" className="btns" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Board;
