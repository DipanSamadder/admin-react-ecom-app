import { Modal } from "antd";
import React from "react";
export default function CustomModel(props) {
  const { open, title, handleSubmit, confirmLoading, handleCancel, body } =
    props;
  return (
    <div>
      <Modal
        title={title}
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{body}</p>
      </Modal>
    </div>
  );
}
