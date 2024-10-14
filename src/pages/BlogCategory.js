import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { blogCategory } from "../features/blogCate/blogCategorySlice";

interface DataType {
  key: React.Key;
  title: string;
  lavel: number;
  parent: number;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: DataType, b: DataType) => a.title.localeCompare(b.title),
  },
  {
    title: "Level",
    dataIndex: "level",
    sorter: (a: DataType, b: DataType) => a.level - b.level,
  },
  {
    title: "Parent",
    dataIndex: "parent",
    sorter: (a: DataType, b: DataType) => a.parent - b.parent,
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
export default function BlogCategory() {
  const dispatch = useDispatch();

  const getBlogCate = useSelector((state: any) => state.bcat.data || []);

  useEffect(() => {
    dispatch(blogCategory());
  }, [dispatch]);

  const data: DataType[] = getBlogCate.map((field: any, index: any) => ({
    key: index,
    title: field.title,
    lavel: field.level,
    parent: field.parent,
    action: (
      <>
        <Link
          className="btn m-1 bg-primary text-white"
          to={`/admin/blog-category/${field._id}`}
        >
          <FaRegEdit />
        </Link>
        <Link className="btn m-1  bg-danger text-white" to="/delete/">
          <MdDelete />
        </Link>
      </>
    ),
  }));
  return (
    <div>
      <h3 className="mb-5">BlogCategory</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
