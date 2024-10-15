import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomModel from "../components/CustomModel";
import { deleteProCate, getProCate } from "../features/proCat/proCatSlice";

interface DataType {
  key: React.Key;
  image: string;
  title: string;
  lavel: number;
  parent: number;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "S.N",
    dataIndex: "key",
    sorter: (a: DateType, b: DateType) => a.key - b.key,
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: DateType, b: DateType) => a.title.localeCompare(b.title),
  },
  {
    title: "Level",
    dataIndex: "level",
    sorter: (a: DateType, b: DateType) => a.level - b.level,
  },
  {
    title: "Parent",
    dataIndex: "parent",
    sorter: (a: DateType, b: DateType) => a.parent - b.parent,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function CategoryList() {
  const dispatch = useDispatch();

  const getPCategory = useSelector((state: any) => state.pcat.data || []);

  const [open, setOpen] = useState(false);
  const [toastMessage, setTostMessage] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setDeleteId(e);
  };
  const deleteAction = useSelector((state) => state.pcat);
  const { isSuccess, isError, message, deleteProCateData } = deleteAction;

  const handleSubmit = (e) => {
    setConfirmLoading(true);
    setTostMessage(true);
    dispatch(deleteProCate(deleteId));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
  };

  useEffect(() => {
    if (toastMessage && deleteId !== undefined && message !== undefined) {
      dispatch(getProCate());
      setTostMessage(false);
      toast.success(message);
      setConfirmLoading(false);
      setOpen(false);
    }
  }, [message, deleteProCateData]);

  useEffect(() => {
    dispatch(getProCate());
  }, [dispatch]);

  const data: DataType[] = getPCategory.map((field: any, index: any) => ({
    key: index + 1,
    image: field.images && (
      <img
        src={field.images[0]?.url}
        alt={field.images[0]?.public_id}
        className="listing-img-size"
      />
    ),
    title: field.title,
    lavel: field.level,
    parent: field.parent,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/category/${field._id}`}
        >
          <FaRegEdit />
        </Link>
        <button
          className="btn m-1 bg-primary text-white"
          onClick={() => showModal(field._id)}
        >
          <MdDelete />
        </button>
      </>
    ),
  }));

  return (
    <div>
      <h3 className="mb-5">Category List</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
      <CustomModel
        open={open}
        title="Coupon Delete"
        handleSubmit={handleSubmit}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        body="Are you want to delete?"
      />
    </div>
  );
}
