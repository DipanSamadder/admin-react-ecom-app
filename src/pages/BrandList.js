import { Table } from "antd";
import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { getBrands } from "../features/brand/brandSlice";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


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
export default function BrandList() {
  const dispatch = useDispatch();

  const getBrandList = useSelector((state:any)=> state.brand.brands  || []);
  console.log(getBrandList);
  useEffect(()=>{
    dispatch(getBrands());
  },[dispatch]);


const data: DataType[] = getBrandList.map((product: any, index:any)=> ({
  key: index,
  title: product.title,
  lavel: product.level,
  parent: product.parent, 
  action:(
    <>
      <Link className="btn m-1 bg-primary text-white" to="/edit/"><FaRegEdit /></Link>
      <Link className="btn m-1  bg-danger text-white" to="/delete/"><MdDelete /></Link>
    </>
  )
}));

  return (
    <div>
      <h3 className="mb-5">Brand List</h3>
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
