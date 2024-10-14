import { Table } from "antd";

import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBlogList } from "../features/blog/blogSlice";

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

  const getBlogsList = useSelector((state: any) => state.blog.data || []);
  console.log(getBlogsList);

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
        <Link className="btn m-1  bg-danger text-white" to="/delete/">
          <MdDelete />
        </Link>
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
    </div>
  );
}
