import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../features/customers/customerSlice";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  mobile: number;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a: DataType, b: DataType) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a: DataType, b: DataType) => a.email.localeCompare(b.email),
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    sorter: (a: DataType, b: DataType) => a.mobile - b.mobile, // This is fine because 'mobile' is a number
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Customers() {
  const dispatch = useDispatch();

  const customerList = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  const data: DataType[] = customerList.map((customer, index) => ({
    key: index,
    name: `${customer.firstname} ${customer.lastname}`,
    email: customer.email,
    mobile: customer.mobile,
  }));

  return (
    <div>
      <h3 className="mb-5">Customers</h3>
      <div className="row g-4 g-xl-5">
        <div className="col-12 col-md-12">
          <div className="tableproduct">
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
