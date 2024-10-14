import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getColorList } from "../features/color/colorSlice";

interface DataType {
  key: React.Key;
  name: string;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "S.N.",
    dataIndex: "key",
    sorter: (a: DataType, b: DataType) => a.key - b.key,
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
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

export default function ColorList() {
  const dispatch = useDispatch();
  const getColorsList = useSelector((state: any) => state.color?.data || []);
  console.log(`${getColorsList} --------------`);

  useEffect(() => {
    dispatch(getColorList());
  }, [dispatch]);

  const data: DataType[] = Array.isArray(getColorsList)
    ? getColorsList.map((row: any, index: any) => ({
        key: index + 1,
        name: (
          <div className="d-flex align-items-center gap-2">
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `#${row.colorCode}`,
              }}
            />
            {row.title}
          </div>
        ),
        action: (
          <>
            <Link
              className="btn m-1 bg-primary text-white"
              to={`/admin/color/${row._id}`}
            >
              <FaRegEdit />
            </Link>
            <Link className="btn m-1 bg-primary text-white" to="/">
              <MdDelete />
            </Link>
          </>
        ),
      }))
    : [];

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
