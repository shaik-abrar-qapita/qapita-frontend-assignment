import React, { useState } from "react";
import { Form, Input, Select, Button, Modal, message } from "antd";
import { generateUniqueId } from "../helper";
import "./TaskForm.css";

const { Option } = Select;
const { TextArea } = Input;

const TaskForm = ({ setTasks, data }) => {
  // const [form] = Form.useForm();
  // const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    // setFormData(values);
    const newData = {
      taskId: generateUniqueId(),
      title: values.title,
      desc: values.desc,
      status: values.status,
    };
    setTasks((prev) => {
      return [...prev, newData];
    });
    setIsModalOpen(false);
    message.success("New Task Added Successfully !");
  };

  // const cancel = (e) => {
  //   console.log(e);
  //   // message.error("Click on No");
  // };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task-form">
      <Button type="primary" onClick={showModal} className="form-button">
        Add New Task
      </Button>
      <Modal
        title="Add New Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h3>Title : </h3>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter Title!" }]}
          >
            <Input />
          </Form.Item>
          <h3>Description : </h3>
          <Form.Item
            name="desc"
            rules={[{ required: true, message: "Please enter Description!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <h3>Status : </h3>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Please select an option!" }]}
          >
            <Select>
              {/* <Option value="todo">To-Do</Option>
              <Option value="progress">In-Progress</Option>
              <Option value="done">Completed</Option> */}

              {Array.isArray(data) &&
                data.map((ele, index) => {
                  return <Option value={ele.status} key={index}></Option>;
                })}
            </Select>
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
      {/* <Form
        form={form}
        name="myForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default TaskForm;
