import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";
import { deleteBlog, getBlogList } from "../features/blog/blogSlice";

interface DataType {
  key: React.Key;
  title: string;
  category: string | undefined;
  slug: string;
  images: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: DataType, b: DataType) => a.title.localeCompare(b.title),
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a: DataType, b: DataType) =>
      (a.category || "").localeCompare(b.category || ""),
  },
  {
    title: "Slug",
    dataIndex: "slug",
  },
  {
    title: "Images",
    dataIndex: "images",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function BlogList() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [toastMessage, setTostMessage] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  const deleteAction = useSelector((state) => state.blog);
  const { isSuccess, isError, message, deleteBlogData } = deleteAction;

  const handleSubmit = (e) => {
    setConfirmLoading(true);
    setTostMessage(true);
    dispatch(deleteBlog(deleteId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  const getBlogsList = useSelector((state: any) => state.blog.data || []);

  useEffect(() => {
    if (toastMessage && deleteId !== undefined && message !== undefined) {
      dispatch(getBlogList());
      setTostMessage(false);
      toast.success(message);
      setConfirmLoading(false);
      setOpen(false);
    }
  }, [message, deleteBlogData]);

  useEffect(() => {
    dispatch(getBlogList());
  }, [dispatch]);

  const data: DataType[] = getBlogsList.map((row: any, index: number) => ({
    key: index,
    title: row.title,
    slug: row.slug,
    images: row.images && (
      <img
        src={row.images[0]?.url}
        alt={row.images[0]?.public_id}
        className="listing-img-size"
      />
    ),
    category: row.category,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/blog/${row._id}`}
        >
          <FaRegEdit />
        </Link>
        <button
          className="btn m-1 bg-primary text-white"
          onClick={() => showModal(row._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-5">Blog List</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
      <CustomModel
        open={open}
        title="Blog Delete"
        handleSubmit={handleSubmit}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        body="Are you want to delete?"
      />
    </div>
  );
}
