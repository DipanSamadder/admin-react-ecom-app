import { Table } from "antd";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import  { ColumnsType } from "antd/es/table";
import { getProCate } from "../features/proCat/proCatSlice";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {Link} from "react-router-dom";


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
    sorter: (a: DateType, b: DateType) => (a.title).localeCompare(b.title)
  },
  {
    title: "Level",
    dataIndex: "level",
    sorter: (a: DateType, b: DateType) => (a.level -b.level)
  },
  {
    title: "Parent",
    dataIndex: "parent",
    sorter: (a: DateType, b: DateType) => (a.parent-b.parent)
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

  const getPCategory = useSelector((state:any)=> state.pcat.data  || []);

  useEffect(()=>{
    dispatch(getProCate());
  },[dispatch]);


const data: DataType[] = getPCategory.map((field: any, index:any)=> ({
  key: index,
  title: field.title,
  lavel: field.level,
  parent: field.parent, 
  action:(
    <>
      <Link className="btn m-1 bg-primary text-white" to="/edit/"><FaRegEdit /></Link>
      <Link className="btn m-1  bg-danger text-white" to="/delete/"><MdDelete /></Link>
    </>
  )
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
    </div>
  );
}
