import { Table } from "antd";
import React, { useEffect } from "react";
import  { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { getColorList } from "../features/color/colorSlice";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


interface DataType {
  key: React.Key;
  name:string,
  action:string
}

const columns: ColumnsType<DataType> = [
  {
    title:"Name",
    dataIndex: "name",
    sorter: (a: DataType, b: DataType) => (a.name).localeCompare(b.name),
  },
  {
    title: "Action",
    dataIndex: "action",
  }
]

const onChange: TableProps<DataType>["onChange"] =(pagination, filters, sorter, extra) => {
  console.log("params", pagination,filters,sorter,extra);
}

export default function ColorList() {
  const dispatch = useDispatch();
  const getColorsList = useSelector((state) => state.color.data || []);
  console.log(getColorsList);
  
  useEffect(()=>{
    dispatch(getColorList());
  },[dispatch]);
  const data: DataType[] = getColorsList.map((row, index)=>(
    {
      key: index,
      name:row.title,
      action:(
        <>
        <Link className="btn m-1 bg-primary text-white" to="/"><FaRegEdit/></Link>
        <Link className="btn m-1 bg-primary text-white" to="/"><MdDelete/></Link>
        </>
      )
    }
  ))
  return (
    <div>
      <h3 className="mb-5">Color List</h3>
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
