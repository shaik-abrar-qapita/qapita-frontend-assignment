import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import React from "react";
const { Meta } = Card;
import "./Task.css";

import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
const { TextArea } = Input;

import { message, Popconfirm } from "antd";

const Task = ({
  title,
  desc,
  handleDelete,
  taskId,
  bgColor,
  setTasks,
  status,
  setActiveCard,
  index,
}) => {
  //   console.log(index);
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);

    const newData = {
      taskId: taskId,
      title: values.title,
      desc: values.desc,
      status: status,
    };

    setTasks((prevTasks) => {
      // Find the index of the task with taskId
      const index = prevTasks.findIndex((task) => task.taskId === taskId);

      // If the task exists, update it, otherwise, return the previous state
      if (index !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = newData;
        return updatedTasks;
      } else {
        return prevTasks;
      }
    });
    setVisible(false); // Close the modal after form submission
    message.success("Successfully edited");
  };

  const confirm = (taskId) => {
    // console.log(e);
    message.success("Task Deleted !");
    handleDelete(taskId);
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="card">
      <Card
        draggable
        onDragStart={() => setActiveCard(index)}
        onDragEnd={() => {
          setActiveCard(null);
        }}
        style={{
          width: 250,
          marginTop: 4,
          backgroundColor: bgColor,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        actions={[
          <Tooltip placement="bottom" title="Edit">
            <EditOutlined key="ellipsis" onClick={showModal} />
          </Tooltip>,
          <Tooltip placement="bottom" title="Delete">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirm(taskId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="bottom"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined />
            </Popconfirm>
          </Tooltip>,
        ]}
      >
        <Meta
          style={{ cursor: "grab" }}
          title={title}
          description={desc}
        ></Meta>
      </Card>
      <Modal
        title="Edit Task"
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            initialValue={title}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="desc"
            initialValue={desc}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <TextArea rows={4} />
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

export default Task;
