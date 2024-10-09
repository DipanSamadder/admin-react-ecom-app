import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteFile, uploadFile } from "../features/upload/uploadSlice";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CustomUpload = ({ fileList, setFileList }) => {
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // Handle File Delete using API
  const handleRemove = async (file) => {
    dispatch(deleteFile(file.uid))
      .then((response) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
        toast.success(response.payload.message);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("File deletion failed.");
      });
  };

  const handleUpload = async ({ file }) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Please upload a file smaller than 10MB.");
      return;
    }
    const formData = new FormData();
    formData.append("images", file);

    dispatch(uploadFile(formData))
      .then((response) => {
        if (!response.payload?.data) {
          throw new Error("Upload failed.");
        }
        // console.log(response.payload.message);

        const uploadedFiles = response.payload.data;
        const newFileList = uploadedFiles.map((uploadedFile) => ({
          uid: uploadedFile._id,
          name: file.name,
          status: "done",
          url: uploadedFile.url,
          publicId: uploadedFile.publicId,
        }));

        setFileList((prev) => [...prev, ...newFileList]);

        // setFileList((prevFileList) => {
        //   return prevFileList
        //     .filter((item) => item.status !== "uploading")
        //     .concat(newFileList);
        // });

        toast.success(response.payload.message);
      })
      .catch((err) => {
        console.error("Upload error:", err);
        toast.error("Upload failed. Please try again.");
      });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined /> <div style={{ marginTop: 8 }}> Upload </div>
    </button>
  );

  return (
    <div>
      <Upload
        customRequest={handleUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
};

export default CustomUpload;
