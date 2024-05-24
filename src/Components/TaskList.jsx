import React from "react";
import Task from "./Task";
import "./TaskList.css";
import DropArea from "./DropArea";
import { Divider, Popconfirm, message } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

const TaskList = ({
  title,
  status,
  tasks,
  handleDelete,
  count,
  setTasks,
  setActiveCard,
  onDrop,
  handleDeleteColumn,
  bgColor,
}) => {
  //   console.log(count);

  const confirm = (title) => {
    // console.log(e);
    message.success("Column Deleted !");
    handleDeleteColumn(title);
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  return (
    <div className="task-column">
      <div className="task-heading">
        <span className="task-heading-text">
          {title} ({count})
        </span>{" "}
        &nbsp;&nbsp;&nbsp;
        <Popconfirm
          title="Delete the Column"
          description="Are you sure to delete this Column?"
          onConfirm={() => confirm(title)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteTwoTone style={{ cursor: "pointer" }} />
        </Popconfirm>
      </div>
      <Divider />

      <div>
        <DropArea onDrop={() => onDrop(status, 0)} />

        {tasks.map((task, index) => {
          return (
            task.status === status && (
              <React.Fragment key={index}>
                <Task
                  handleDelete={handleDelete}
                  title={task.title}
                  desc={task.desc}
                  status={status}
                  setTasks={setTasks}
                  taskId={task.taskId}
                  setActiveCard={setActiveCard}
                  index={index}
                  bgColor={bgColor}
                />
                <DropArea onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            )
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
